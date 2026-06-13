import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';

// @desc    Create new ticket
// @route   POST /api/tickets
export const createTicket = asyncHandler(async (req, res) => {
    let { type, category, priority, description } = req.body;
    const userId = req.user.userId;

    // Log received values (helps debugging)
    console.log('Received category:', JSON.stringify(category));

    // Normalize priority to lowercase
    if (priority) priority = priority.toLowerCase();

    // Normalize category: trim spaces
    if (category) category = category.trim();

    // Optional: Convert to proper case if needed (e.g., 'electrical' → 'Electrical')
    // But better to fix the frontend dropdown values.

    // List of allowed categories (exact strings)
    const allowedCategories = [
        'Plumbing', 'Electrical', 'Structural', 'Pest Control',
        'Common Areas', 'Parking', 'Lease & Billing', 'Security & Safety', 'HVAC'
    ];

    if (!allowedCategories.includes(category)) {
        return res.status(400).json({
            success: false,
            message: `Invalid category value: "${category}". Allowed: ${allowedCategories.join(', ')}`
        });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO tickets (user_id, type, category, priority, description) VALUES (?, ?, ?, ?, ?)',
            [userId, type, category, priority, description]
        );
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

    if (role !== 'admin') {
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

    if (role !== 'admin') {
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