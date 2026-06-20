import pool from '../config/db.js';

// Insert a single notification row. Failures are logged but never thrown —
// notifications are a side-effect and must not break the calling request.
export async function createNotification({ userId, type, title, message, link = null }) {
    if (!userId || !title || !message) return;
    try {
        await pool.query(
            'INSERT INTO notifications (user_id, type, title, message, link) VALUES (?, ?, ?, ?, ?)',
            [userId, type, title, message, link]
        );
    } catch (err) {
        console.error('Failed to create notification:', err.message);
    }
}

// Fan a notification out to every active admin / superadmin.
// Use this for events a user triggers that admins need to know about.
export async function notifyAdmins({ type, title, message, link = null }) {
    try {
        const [admins] = await pool.query(
            "SELECT user_id FROM users WHERE role IN ('admin', 'superadmin') AND is_active = TRUE"
        );
        await Promise.all(
            admins.map((a) =>
                createNotification({ userId: a.user_id, type, title, message, link })
            )
        );
    } catch (err) {
        console.error('notifyAdmins failed:', err.message);
    }
}
