import bcrypt from 'bcrypt';
import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import { createNotification } from '../services/notificationService.js';
import { logActivity } from '../services/activityLogService.js';
import {
    emailRegex,
    nameRegex,
    normalizeEmail,
    normalizeName,
    validatePassword
} from '../util/validation.js';

const BCRYPT_ROUNDS = 12;
const VALID_ROLES = ['guest', 'staff', 'admin'];
const FILTERABLE_ROLES = ['guest', 'staff', 'admin', 'superadmin'];

async function getUserById(id) {
    const [rows] = await pool.query(
        'SELECT user_id, first_name, last_name, email, role, is_active FROM users WHERE user_id = ? LIMIT 1',
        [id]
    );
    return rows[0] || null;
}

async function ensureNotLastElevatedUser(targetUser, actionLabel) {
    const elevatedRoles = ['admin', 'superadmin'];
    if (!targetUser || !elevatedRoles.includes(targetUser.role) || !targetUser.is_active) return null;

    const [[{ count }]] = await pool.query(
        'SELECT COUNT(*) AS count FROM users WHERE role IN ("admin", "superadmin") AND is_active = TRUE'
    );

    if (count <= 1) {
        return `Cannot ${actionLabel} the last active Admin/Super Admin account.`;
    }

    return null;
}

export const getAllUsers = asyncHandler(async (req, res) => {
    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = 10;
    const offset = (page - 1) * limit;
    const requestedRole = req.query.role;
    const roleFilter = requestedRole && FILTERABLE_ROLES.includes(requestedRole) ? requestedRole : null;

    const params = [];
    let whereClause = '';
    if (roleFilter) {
        whereClause = 'WHERE role = ?';
        params.push(roleFilter);
    }

    const [[{ total }]] = await pool.query(`SELECT COUNT(*) AS total FROM users ${whereClause}`, params);
    const [rows] = await pool.query(
        `SELECT user_id, first_name, last_name, email, role, is_active, created_at
         FROM users ${whereClause}
         ORDER BY created_at DESC
         LIMIT ? OFFSET ?`,
        [...params, limit, offset]
    );

    res.json({
        users: rows,
        total,
        page,
        totalPages: Math.ceil(total / limit) || 1
    });
});

export const createUser = asyncHandler(async (req, res) => {
    const firstName = normalizeName(req.body.first_name);
    const lastName = normalizeName(req.body.last_name);
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');
    const assignedRole = req.body.role && VALID_ROLES.includes(req.body.role) ? req.body.role : 'guest';

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ success: false, message: 'First name, last name, email, and password are required.' });
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        return res.status(400).json({ success: false, message: 'Names must be 2-60 characters and use letters, spaces, hyphens, or apostrophes only.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const passwordError = validatePassword(password, [firstName, lastName, email.split('@')[0]]);
    if (passwordError) {
        return res.status(400).json({ success: false, message: passwordError });
    }

    const [existing] = await pool.query('SELECT user_id FROM users WHERE LOWER(email) = ? LIMIT 1', [email]);
    if (existing.length > 0) {
        return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    try {
        const [result] = await pool.query(
            'INSERT INTO users (first_name, last_name, email, password_hash, role) VALUES (?, ?, ?, ?, ?)',
            [firstName, lastName, email, hashedPassword, assignedRole]
        );

        await logActivity({
            actorId: req.user.userId,
            targetUserId: result.insertId,
            action: 'user_create',
            oldValue: null,
            newValue: assignedRole,
            metadata: { email }
        });
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
        }
        throw err;
    }

    res.status(201).json({ success: true, message: 'User created successfully.' });
});

export const deleteUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const targetId = Number(id);

    if (req.user.userId === targetId) {
        return res.status(400).json({ success: false, message: 'Cannot delete your own account.' });
    }

    const targetUser = await getUserById(targetId);
    if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    const guardrailMessage = await ensureNotLastElevatedUser(targetUser, 'delete');
    if (guardrailMessage) {
        return res.status(400).json({ success: false, message: guardrailMessage });
    }

    await logActivity({
        actorId: req.user.userId,
        targetUserId: targetId,
        action: 'user_delete',
        oldValue: targetUser.role,
        newValue: 'deleted',
        metadata: { email: targetUser.email }
    });

    const [result] = await pool.query('DELETE FROM users WHERE user_id = ?', [targetId]);

    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.json({ success: true, message: 'User deleted successfully.' });
});

export const toggleUserActive = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const targetId = Number(id);

    if (req.user.userId === targetId) {
        return res.status(400).json({ success: false, message: 'Cannot deactivate your own account.' });
    }

    const targetUser = await getUserById(targetId);
    if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (targetUser.is_active) {
        const guardrailMessage = await ensureNotLastElevatedUser(targetUser, 'deactivate');
        if (guardrailMessage) {
            return res.status(400).json({ success: false, message: guardrailMessage });
        }
    }

    const newStatus = targetUser.is_active ? 0 : 1;
    await pool.query('UPDATE users SET is_active = ? WHERE user_id = ?', [newStatus, targetId]);

    await logActivity({
        actorId: req.user.userId,
        targetUserId: targetId,
        action: newStatus ? 'user_activate' : 'user_deactivate',
        oldValue: targetUser.is_active ? 'active' : 'inactive',
        newValue: newStatus ? 'active' : 'inactive'
    });

    await createNotification({
        userId: targetId,
        type: 'account_change',
        title: 'Account status changed',
        message: `Your account has been ${newStatus ? 'activated' : 'deactivated'} by an administrator.`
    });

    res.json({ success: true, message: `User ${newStatus ? 'activated' : 'deactivated'}.` });
});

export const updateUserRole = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const targetId = Number(id);
    const { role } = req.body;

    if (!VALID_ROLES.includes(role)) {
        return res.status(400).json({ success: false, message: `Invalid role. Allowed: ${VALID_ROLES.join(', ')}` });
    }

    if (req.user.userId === targetId) {
        return res.status(400).json({ success: false, message: 'Cannot change your own role.' });
    }

    const targetUser = await getUserById(targetId);
    if (!targetUser) {
        return res.status(404).json({ success: false, message: 'User not found.' });
    }

    if (targetUser.role === role) {
        return res.json({ success: true, message: 'Role unchanged.' });
    }

    const guardrailMessage = await ensureNotLastElevatedUser(targetUser, 'demote');
    if (guardrailMessage) {
        return res.status(400).json({ success: false, message: guardrailMessage });
    }

    await pool.query('UPDATE users SET role = ? WHERE user_id = ?', [role, targetId]);

    await logActivity({
        actorId: req.user.userId,
        targetUserId: targetId,
        action: 'user_role_update',
        oldValue: targetUser.role,
        newValue: role
    });

    await createNotification({
        userId: targetId,
        type: 'account_change',
        title: 'Your role has changed',
        message: `Your account role is now "${role}".`
    });

    res.json({ success: true, message: 'Role updated.' });
});

export const getActivityLogs = asyncHandler(async (req, res) => {
    try {
        const [rows] = await pool.query(`
            SELECT
                al.id,
                al.action,
                al.old_value,
                al.new_value,
                al.metadata,
                al.created_at,
                al.ticket_id,
                CONCAT(actor.first_name, ' ', actor.last_name) AS actor_name,
                actor.email AS actor_email,
                CONCAT(target.first_name, ' ', target.last_name) AS target_name,
                target.email AS target_email
            FROM activity_logs al
            LEFT JOIN users actor ON al.actor_id = actor.user_id
            LEFT JOIN users target ON al.target_user_id = target.user_id
            ORDER BY al.created_at DESC
            LIMIT 100
        `);
        res.json({ success: true, logs: rows });
    } catch (err) {
        if (err.code === 'ER_NO_SUCH_TABLE') {
            return res.json({ success: true, logs: [], message: 'Run migration 009_create_activity_logs.sql to enable activity logs.' });
        }
        throw err;
    }
});
