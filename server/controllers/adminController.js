import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityLogService.js';
import { STATUS_LABEL_TO_VALUE, isValidStatusTransition } from '../util/validation.js';

// Get dashboard statistics
export const getStats = asyncHandler(async (req, res) => {
    const [totalTickets] = await pool.query('SELECT COUNT(*) AS count FROM tickets');
    const [openTickets] = await pool.query('SELECT COUNT(*) AS count FROM tickets WHERE status = "open"');
    const [totalUsers] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE role NOT IN ("admin", "superadmin")');
    res.json({
        totalTickets: totalTickets[0].count,
        openTickets: openTickets[0].count,
        totalUsers: totalUsers[0].count
    });
});

// Get all users (admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
        'SELECT user_id, first_name, last_name, email, role, created_at FROM users'
    );
    res.json(rows);
});

// Get all tickets with user details (admin only)
export const getAllTickets = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
        SELECT 
            t.id, 
            t.user_id,
            t.type, 
            t.category, 
            t.priority, 
            t.status, 
            t.description, 
            t.created_at,
            CONCAT(u.first_name, ' ', u.last_name) AS user_name,
            u.email AS user_email
        FROM tickets t
        JOIN users u ON t.user_id = u.user_id
        ORDER BY t.created_at DESC
    `);
    res.json(rows);
});

// Update ticket status (admin only)
export const updateTicketStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const dbStatus = STATUS_LABEL_TO_VALUE[req.body.status];

    if (!dbStatus) {
        return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const [ticketRows] = await pool.query(
        'SELECT id, user_id, status FROM tickets WHERE id = ? LIMIT 1',
        [id]
    );

    if (ticketRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    const ticket = ticketRows[0];

    if (!isValidStatusTransition(ticket.status, dbStatus)) {
        return res.status(400).json({
            success: false,
            message: `Invalid status change. Ticket must follow: Open → In Progress → Resolved → Closed.`
        });
    }

    if (ticket.status === dbStatus) {
        return res.json({ success: true, message: 'Status unchanged.' });
    }

    await pool.query('UPDATE tickets SET status = ? WHERE id = ?', [dbStatus, id]);

    await logActivity({
        actorId: req.user.userId,
        ticketId: Number(id),
        action: 'ticket_status_update',
        oldValue: ticket.status,
        newValue: dbStatus
    });

    await createNotification({
        userId: ticket.user_id,
        type: 'ticket_status',
        title: 'Ticket status updated',
        message: `Your ticket #${id} is now "${dbStatus.replace('_', ' ')}".`,
        link: `/tickets/${id}`
    });

    res.json({ success: true, message: 'Status updated.', oldStatus: ticket.status, newStatus: dbStatus });
});
