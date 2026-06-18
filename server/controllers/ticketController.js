import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import { createNotification, notifyAdmins } from '../services/notificationService.js';

// @desc    Create new ticket
// @route   POST /api/tickets
export const createTicket = asyncHandler(async (req, res) => {
    let { type, category, priority, description } = req.body;
    const userId = req.user.userId;

    if (priority) {
        const priorityMap = { 'low': 'low', 'medium': 'medium', 'high': 'high', 'critical': 'urgent' };
        priority = priorityMap[priority.toLowerCase()] || priority.toLowerCase();
    }
    if (category) category = category.trim();

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

        res.status(201).json({ message: 'Ticket created successfully', ticketId: result.insertId });
    } catch (error) {
        console.error('Ticket creation SQL error:', error.message);
        throw error;
    }
});

// @desc    Get tickets for logged-in user (guest/staff see own)
// @route   GET /api/tickets
export const getUserTickets = asyncHandler(async (req, res) => {
    const userId = req.user.userId;   // ✅ changed
    const role = req.user.role;

    let query = `SELECT * FROM tickets WHERE user_id = ? ORDER BY created_at DESC`;
    let params = [userId];

    const [rows] = await pool.query(query, params);
    res.json(rows);
});

// @desc    Get single ticket by ID (with permission check)
// @route   GET /api/tickets/:id
export const getTicketById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;   // ✅ changed
    const role = req.user.role;

    let query = `
        SELECT t.*, 
               CONCAT(u.first_name, ' ', u.last_name) AS user_name,
               u.email AS user_email
        FROM tickets t
        JOIN users u ON t.user_id = u.user_id
        WHERE t.id = ?
    `;
    let params = [id];

    if (role !== 'admin' && role !== 'superadmin') {
        query += ` AND t.user_id = ?`;
        params.push(userId);
    }

    const [rows] = await pool.query(query, params);
    if (rows.length === 0) {
        return res.status(404).json({ message: 'Ticket not found' });
    }

    res.json(rows[0]);
});

// @desc    Update ticket status (user can update own, admin any)
// @route   PUT /api/tickets/:id/status
export const updateTicketStatus = asyncHandler(async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;
    const userId = req.user.userId;   // ✅ changed
    const role = req.user.role;

    let query = `UPDATE tickets SET status = ? WHERE id = ?`;
    let params = [status, id];

    if (role !== 'admin' && role !== 'superadmin') {
        query += ` AND user_id = ?`;
        params.push(userId);
    }

    const [result] = await pool.query(query, params);
    if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Ticket not found or not authorized' });
    }
    res.json({ message: 'Status updated' });
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

// @desc    Delete ticket (admin only)
// @route   DELETE /api/admin/tickets/:id
export const deleteTicket = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await pool.query(`DELETE FROM tickets WHERE id = ?`, [id]);
    res.json({ message: 'Ticket deleted' });
});

export const getTicketReplies = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;
    const role = req.user.role;

    const [ticket] = await pool.query('SELECT id, status FROM tickets WHERE id = ?', [id]);
    if (ticket.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (role !== 'admin' && role !== 'superadmin') {
        const [owner] = await pool.query('SELECT user_id FROM tickets WHERE id = ?', [id]);
        if (owner[0].user_id !== userId) {
            return res.status(403).json({ success: false, message: 'Not authorized' });
        }
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
    const { message } = req.body;
    const userId = req.user.userId;
    const role = req.user.role;

    if (!message || !message.trim()) {
        return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const [ticket] = await pool.query('SELECT id, status, user_id FROM tickets WHERE id = ?', [id]);
    if (ticket.length === 0) {
        return res.status(404).json({ success: false, message: 'Ticket not found' });
    }

    if (role !== 'admin' && role !== 'superadmin' && ticket[0].user_id !== userId) {
        return res.status(403).json({ success: false, message: 'Not authorized' });
    }

    if (ticket[0].status === 'resolved' || ticket[0].status === 'closed') {
        return res.status(400).json({ success: false, message: 'Cannot reply to a resolved or closed ticket' });
    }

    const [result] = await pool.query(
        'INSERT INTO ticket_replies (ticket_id, user_id, message) VALUES (?, ?, ?)',
        [id, userId, message.trim()]
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

    // Notify the other party about the new reply.
    const isAdminAuthor = role === 'admin' || role === 'superadmin';
    if (isAdminAuthor) {
        // Staff replied → notify the ticket owner (skip self if owner is the same admin).
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
        // User replied → notify all admins.
        await notifyAdmins({
            type: 'ticket_reply',
            title: 'New reply on a ticket',
            message: `A user replied to ticket #${id}.`,
            link: `/admin/tickets/${id}`
        });
    }

    res.status(201).json({ reply: newReply[0] });
});