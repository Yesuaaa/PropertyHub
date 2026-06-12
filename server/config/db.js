// server/config/db.js
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
    host: process.env.DB_HOST || process.env.DATABASE_HOST, // fallback for both
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test connection on startup
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL connected via .env configuration');
        connection.release();
    } catch (err) {
        console.error('❌ MySQL connection error:', err.message);
    }
})();

export default pool;