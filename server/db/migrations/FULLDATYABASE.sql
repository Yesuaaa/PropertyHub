// DO NOT RUN THIS FILE THIS IS FOR SAMPLE PURPOSES ONLY
-- 1. Create the database (if not exists)
CREATE DATABASE IF NOT EXISTS propertyhub;
USE propertyhub;

-- 2. Users table
CREATE TABLE users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    role ENUM('guest', 'staff', 'admin') DEFAULT 'guest',
    password_hash VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Token blocklist table
CREATE TABLE token_blocklist (
    id INT PRIMARY KEY AUTO_INCREMENT,
    token TEXT NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_expires_at (expires_at)
);

-- 4. Tickets table (including HVAC in category ENUM)
CREATE TABLE tickets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type ENUM('Maintenance Request', 'Noise Complaint', 'Lease Dispute', 'General Feedback', 'Safety Concern') NOT NULL,
    category ENUM(
        'Plumbing', 'Electrical', 'Structural', 'Pest Control',
        'Common Areas', 'Parking', 'Lease & Billing', 'Security & Safety', 'HVAC'
    ) NOT NULL,
    priority ENUM('low', 'medium', 'high', 'urgent') DEFAULT 'medium',
    status ENUM('open', 'in_progress', 'resolved', 'closed') DEFAULT 'open',
    subject VARCHAR(255) NULL,                -- made nullable (or drop if not needed)
    description TEXT NOT NULL,
    attachment_url VARCHAR(500) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

// DI PA TO NA AADD SA MISMONG DATABASE
-- 5. Password resets table
CREATE TABLE IF NOT EXISTS password_resets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    token VARCHAR(255) NOT NULL,
    expires_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_token (token),
    INDEX idx_expires (expires_at)
);