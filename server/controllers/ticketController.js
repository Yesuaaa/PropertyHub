import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import { createNotification, notifyAdmins } from '../services/notificationService.js';
import { logActivity } from '../services/activityLogService.js';
import {
    TYPE_CATEGORIES,
    STATUS_LABEL_TO_VALUE,
    cleanText,
    normalizePriority,
    isValidStatusTransition
} from '../util/validation.js';

function validateTicketPayload({ type, category, priority, description }) {
    const cleanType = cleanText(type, 100);
    const cleanCategory = cleanText(category, 100);
    const cleanDescription = cleanText(description, 1000);
    const cleanPriority = normalizePriority(priority || 'medium');

    if (!cleanType || !TYPE_CATEGORIES[cleanType]) {
        return { error: 'Please select a valid request type.' };
    }

    if (!cleanCategory || !TYPE_CATEGORIES[cleanType].includes(cleanCategory)) {
        return { error: 'Please select a valid category for the selected request type.' };
    }

    if (!cleanPriority) {
        return { error: 'Please select a valid priority.' };
    }

    if (!cleanDescription) {
        return { error: 'Description is required.' };
    }

    if (cleanDescription.length < 10) {
        return { error: 'Description must be at least 10 characters.' };
    }

    return {
        value: {
            type: cleanType,
            category: cleanCategory,
            priority: cleanPriority,
            description: cleanDescription
        }
    };
}

// @desc    Create new ticket
// @route   POST /api/tickets
export const createTicket = asyncHandler(async (req, res) => {
    const userId = req.user.userId;
    const validation = validateTicketPayload(req.body);

    if (validation.error) {
        return res.status(400).json({ success: false, message: validation.error });
    }

    const { type, category, priority, description } = validation.value;

    try {
        const [result] = await pool.query(
            'INSERT INTO tickets (user_id, type, category, priority, description) VALUES (?, ?, ?, ?, ?)',
            [userId, type, category, priority, description]
        );

        await notifyAdmins({
            type: 'ticket_created',
            title: 'New ticket submitted',
            message: `A new ${type} request (${category}) was just submitted.`,
            link: `/admin/tickets/${result.insertId}`
        });

        res.status(201).json({ success: true, message: 'Ticket created successfully.', ticketId: result.insertId });
    } catch (error) {
        console.error('Ticket creation SQL error:', error.message);
        throw error;
    }
});

// @desc    Get tickets for logged-in user
// @route   GET /api/tickets
export const getUserTickets = asyncHandler(async (req, res) => {
    const userId = req.user.userId;

    const [rows] = await pool.query(
        'SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC',
        [userId]
    );
    res.json(rows);
});

// @desc    Get single ticket by ID (with permission check)
// @route   GET /api/tickets/:id
export const getTicketById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;

    let query = `
        SELECT t.*, 
               CONCAT(u.first_name, ' ', u.last_name) AS user_name,
               u.email AS user_email
        FROM tickets t
        JOIN users u ON t.user_id = u.user_id
        WHERE t.id = ?
    `;
    const params = [id];

    if (role !== 'admin' && role !== 'superadmin' && role !== 'staff') {
        query += ' AND t.user_id = ?';
        params.push(userId);
    }

    const [rows] = await pool.query(query, params);
    if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    res.json(rows[0]);
});

// @desc    Update ticket status (admin/staff can update; users can only close their own resolved ticket)
// @route   PUT /api/tickets/:id/status
export const updateTicketStatus = asyncHandler(async (req, res) => {
    const dbStatus = STATUS_LABEL_TO_VALUE[req.body.status];
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;

    if (!dbStatus) {
        return res.status(400).json({ success: false, message: 'Invalid status value.' });
    }

    const [ticketRows] = await pool.query('SELECT id, user_id, status FROM tickets WHERE id = ? LIMIT 1', [id]);
    if (ticketRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    const ticket = ticketRows[0];
    const isStaff = role === 'admin' || role === 'superadmin' || role === 'staff';
    const isOwner = ticket.user_id === userId;

    if (!isStaff && !isOwner) {
        return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (!isStaff && !(ticket.status === 'resolved' && dbStatus === 'closed')) {
        return res.status(403).json({ success: false, message: 'Only staff can update ticket status before it is resolved.' });
    }

    if (!isValidStatusTransition(ticket.status, dbStatus)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid status change. Ticket must follow: Open → In Progress → Resolved → Closed.'
        });
    }

    if (ticket.status === dbStatus) {
        return res.json({ success: true, message: 'Status unchanged.' });
    }

    await pool.query('UPDATE tickets SET status = ? WHERE id = ?', [dbStatus, id]);

    await logActivity({
        actorId: userId,
        ticketId: Number(id),
        action: 'ticket_status_update',
        oldValue: ticket.status,
        newValue: dbStatus
    });

    res.json({ success: true, message: 'Status updated.', oldStatus: ticket.status, newStatus: dbStatus });
});

// @desc    Admin only: get all tickets
// @route   GET /api/admin/tickets
export const getAllTickets = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(`
        SELECT t.*, CONCAT(u.first_name, ' ', u.last_name) AS user_name, u.email
        FROM tickets t
        JOIN users u ON t.user_id = u.user_id
        ORDER BY t.created_at DESC
    `);
    res.json(rows);
});

// @desc    Delete ticket (superadmin only via route)
// @route   DELETE /api/superadmin/tickets/:id
export const deleteTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const [ticketRows] = await pool.query('SELECT id, status FROM tickets WHERE id = ? LIMIT 1', [id]);
    if (ticketRows.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    await logActivity({
        actorId: req.user.userId,
        ticketId: Number(id),
        action: 'ticket_delete',
        oldValue: ticketRows[0].status,
        newValue: 'deleted'
    });

    const [result] = await pool.query('DELETE FROM tickets WHERE id = ?', [id]);
    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    res.json({ success: true, message: 'Ticket deleted.' });
});

export const getTicketReplies = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;

    const [ticket] = await pool.query('SELECT id, status, user_id FROM tickets WHERE id = ?', [id]);
    if (ticket.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    if (role !== 'admin' && role !== 'superadmin' && role !== 'staff' && ticket[0].user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    const [rows] = await pool.query(
        `SELECT r.id, r.message, r.created_at,
                r.user_id,
                CONCAT(u.first_name, ' ', u.last_name) AS author_name,
                u.role AS author_role
         FROM ticket_replies r
         JOIN users u ON r.user_id = u.user_id
         WHERE r.ticket_id = ?
         ORDER BY r.created_at ASC`,
        [id]
    );

    res.json({ replies: rows, status: ticket[0].status });
});

export const createTicketReply = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const message = cleanText(req.body.message, 1000);
    const userId = req.user.userId;
    const role = req.user.role;

    if (!message) {
        return res.status(400).json({ success: false, message: 'Message is required.' });
    }

    if (message.length < 2) {
        return res.status(400).json({ success: false, message: 'Message must be at least 2 characters.' });
    }

    const [ticket] = await pool.query('SELECT id, status, user_id FROM tickets WHERE id = ?', [id]);
    if (ticket.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found.' });
    }

    if (role !== 'admin' && role !== 'superadmin' && role !== 'staff' && ticket[0].user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Not authorized.' });
    }

    if (ticket[0].status === 'resolved' || ticket[0].status === 'closed') {
        return res.status(400).json({ success: false, message: 'Cannot reply to a resolved or closed ticket.' });
    }

    const [result] = await pool.query(
        'INSERT INTO ticket_replies (ticket_id, user_id, message) VALUES (?, ?, ?)',
        [id, userId, message]
    );

    const [newReply] = await pool.query(
        `SELECT r.id, r.message, r.created_at, r.user_id,
                CONCAT(u.first_name, ' ', u.last_name) AS author_name,
                u.role AS author_role
         FROM ticket_replies r
         JOIN users u ON r.user_id = u.user_id
         WHERE r.id = ?`,
        [result.insertId]
    );

    const isAdminAuthor = role === 'admin' || role === 'superadmin' || role === 'staff';
    if (isAdminAuthor) {
        if (ticket[0].user_id !== userId) {
            await createNotification({
                userId: ticket[0].user_id,
                type: 'ticket_reply',
                title: 'New reply on your ticket',
                message: `Support has replied to your ticket #${id}.`,
                link: `/tickets/${id}`
            });
        }
    } else {
        await notifyAdmins({
            type: 'ticket_reply',
            title: 'New reply on a ticket',
            message: `A user replied to ticket #${id}.`,
            link: `/admin/tickets/${id}`
        });
    }

    res.status(201).json({ success: true, reply: newReply[0] });
});
