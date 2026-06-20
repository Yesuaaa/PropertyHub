-- Activity logs for admin and super admin actions.
-- Safe to run multiple times in DBeaver.

CREATE TABLE IF NOT EXISTS activity_logs (
    id             INT AUTO_INCREMENT PRIMARY KEY,
    actor_id       INT NULL,
    target_user_id INT NULL,
    ticket_id      INT NULL,
    action         VARCHAR(100) NOT NULL,
    old_value      VARCHAR(255) NULL,
    new_value      VARCHAR(255) NULL,
    metadata       JSON NULL,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (actor_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (target_user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    FOREIGN KEY (ticket_id) REFERENCES tickets(id) ON DELETE SET NULL,
    INDEX idx_activity_actor (actor_id),
    INDEX idx_activity_ticket (ticket_id),
    INDEX idx_activity_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
