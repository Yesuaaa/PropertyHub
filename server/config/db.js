import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import { buildSslConfig } from './ssl.js';

dotenv.config();

const sslConfig = buildSslConfig();

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    connectTimeout: 30000,               // 30 seconds
    ...(sslConfig && { ssl: sslConfig })
});

// Test connection on startup
(async () => {
    try {
        const connection = await pool.getConnection();
        console.log('✅ MySQL connected successfully');
        connection.release();
    } catch (err) {
        console.error('❌ MySQL connection error:', err.message);
        if (err.code === 'HANDSHAKE_SSL_ERROR') {
            console.error('   → SSL handshake failed. Try setting DB_SSL=true in .env (development mode)');
        }
        process.exit(1); // optional: stop the server if DB is unreachable
    }
})();

export default pool;