import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import { createNotification } from '../services/notificationService.js';

const BCRYPT_ROUNDS = 12;
const VALID_ROLES = ['guest', 'staff', 'admin'];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const getAllUsers = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = 10;
    const offset = (page - 1) * limit;

    const [[{ total }]] = await pool.query('SELECT COUNT(*) AS total FROM users');
    const [rows] = await pool.query(
        'SELECT user_id, first_name, last_name, email, role, is_active, created_at FROM users ORDER BY created_at DESC LIMIT ? OFFSET ?',
        [limit, offset]
    );

    res.json({
        users: rows,
        total,
        page,
        totalPages: Math.ceil(total / limit)
    });
});

export const createUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password, role } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required: first_name, last_name, email, password' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({ success: false, message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character' });
    }

    const assignedRole = role && VALID_ROLES.includes(role) ? role : 'guest';

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    try {
        await pool.query(
            'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
            [first_name, last_name, email, hashedPassword, assignedRole]
        );
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'An account with this email already exists' });
        }
        throw err;
    }

    res.status(201).json({ success: true, message: 'User created successfully' });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (req.user.userId === Number(id)) {
        return res.status(400).json({ success: false, message: 'Cannot delete your own account' });
    }

    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.json({ success: true, message: 'User deleted successfully' });
});

export const toggleUserActive = asyncHandler(async (req, res) => {
    const { id } = req.params;

    if (req.user.userId === Number(id)) {
        return res.status(400).json({ success: false, message: 'Cannot deactivate your own account' });
    }

    const [rows] = await pool.query('SELECT is_active FROM users WHERE user_id = ?', [id]);
    if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const newStatus = rows[0].is_active ? 0 : 1;
    await pool.query('UPDATE users SET is_active = ? WHERE user_id = ?', [newStatus, id]);

    await createNotification({
        userId: Number(id),
        type: 'account_change',
        title: 'Account status changed',
        message: `Your account has been ${newStatus ? 'activated' : 'deactivated'} by an administrator.`
    });

    res.json({ success: true, message: `User ${newStatus ? 'activated' : 'deactivated'}` });
});

export const updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { role } = req.body;

    if (!VALID_ROLES.includes(role)) {
        return res.status(400).json({ success: false, message: `Invalid role. Allowed: ${VALID_ROLES.join(', ')}` });
    }

    if (req.user.userId === Number(id)) {
        return res.status(400).json({ success: false, message: 'Cannot change your own role' });
    }

    const [result] = await pool.query('UPDATE users SET role = ? WHERE user_id = ?', [role, id]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    await createNotification({
        userId: Number(id),
        type: 'account_change',
        title: 'Your role has changed',
        message: `Your account role is now "${role}".`
    });

    res.json({ success: true, message: 'Role updated' });
});
