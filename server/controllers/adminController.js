import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import { createNotification } from '../services/notificationService.js';

// Get dashboard statistics
export const getStats = asyncHandler(async (req, res) => {
    const [totalTickets] = await pool.query('SELECT COUNT(*) AS count FROM tickets');
    const [openTickets] = await pool.query('SELECT COUNT(*) AS count FROM tickets WHERE status = "open"');
    const [totalUsers] = await pool.query('SELECT COUNT(*) AS count FROM users WHERE role != "admin"');
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
    let { status } = req.body;

    // Map frontend status to database ENUM values
    const statusMap = {
        'Open': 'open',
        'In Progress': 'in_progress',
        'Resolved': 'resolved',
        'Closed': 'closed'
    };

    const dbStatus = statusMap[status];
    if (!dbStatus) {
        return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const [result] = await pool.query(
        'UPDATE tickets SET status = ? WHERE id = ?',
        [dbStatus, id]
    );

    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    // Notify the ticket's owner that the status changed.
    const [ownerRows] = await pool.query('SELECT user_id FROM tickets WHERE id = ?', [id]);
    if (ownerRows.length > 0) {
        await createNotification({
            userId: ownerRows[0].user_id,
            type: 'ticket_status',
            title: 'Ticket status updated',
            message: `Your ticket #${id} is now "${status}".`,
            link: `/tickets/${id}`
        });
    }

    res.json({ success: true, message: 'Status updated' });
});