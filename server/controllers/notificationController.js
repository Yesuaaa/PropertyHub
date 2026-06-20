import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';

// @desc    List notifications for the logged-in user (most recent first)
// @route   GET /api/notifications
export const getNotifications = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
        `SELECT id, type, title, message, link, is_read, created_at
         FROM notifications
         WHERE user_id = ?
         ORDER BY created_at DESC
         LIMIT 50`,
        [req.user.userId]
    );
    res.json({ success: true, notifications: rows });
});

// @desc    Unread notification count (lightweight endpoint for polling/badges)
// @route   GET /api/notifications/unread-count
export const getUnreadCount = asyncHandler(async (req, res) => {
    const [[{ count }]] = await pool.query(
        'SELECT COUNT(*) AS count FROM notifications WHERE user_id = ? AND is_read = FALSE',
        [req.user.userId]
    );
    res.json({ success: true, count });
});

// @desc    Mark a single notification as read
// @route   PATCH /api/notifications/:id/read
export const markAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const [result] = await pool.query(
        'UPDATE notifications SET is_read = TRUE WHERE id = ? AND user_id = ?',
        [id, req.user.userId]
    );
    if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: 'Notification not found' });
    }
    res.json({ success: true });
});

// @desc    Mark every unread notification as read for the current user
// @route   PATCH /api/notifications/read-all
export const markAllAsRead = asyncHandler(async (req, res) => {
    await pool.query(
        'UPDATE notifications SET is_read = TRUE WHERE user_id = ? AND is_read = FALSE',
        [req.user.userId]
    );
    res.json({ success: true });
});

// @desc    Delete a notification
// @route   DELETE /api/notifications/:id
export const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    await pool.query(
        'DELETE FROM notifications WHERE id = ? AND user_id = ?',
        [id, req.user.userId]
    );
    res.json({ success: true });
});
