import pool from '../config/db.js';

export async function logActivity({ actorId, targetUserId = null, ticketId = null, action, oldValue = null, newValue = null, metadata = null }) {
    try {
        await pool.query(
            `INSERT INTO activity_logs
                (actor_id, target_user_id, ticket_id, action, old_value, new_value, metadata)
             VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                actorId || null,
                targetUserId,
                ticketId,
                action,
                oldValue,
                newValue,
                metadata ? JSON.stringify(metadata) : null
            ]
        );
    } catch (err) {
        if (err.code === 'ER_NO_SUCH_TABLE') {
            console.warn('Activity log skipped: activity_logs table does not exist. Run migration 009_create_activity_logs.sql.');
            return;
        }
        console.warn('Activity log skipped:', err.message);
    }
}
