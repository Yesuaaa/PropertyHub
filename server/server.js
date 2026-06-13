import dotenv from 'dotenv';
dotenv.config(); // ✅ must be first — loads .env before anything else reads it

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';     
import pool from './config/db.js';          

// route imports
import authRoutes from './routes/authRoutes.js';
import ticketRoutes from './routes/ticketRoutes.js';

const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,         // ✅ restrict to your frontend only
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true                         // ✅ required for HTTP-only cookies
}));

// Parsing Middleware — must be before routes
app.use(express.json({ limit: '10kb' }));     // ✅ request size limit
app.use(cookieParser());                      // ✅ enables req.cookies

// use routes
app.use('/api/auth', authRoutes);
app.use('/api/tickets', ticketRoutes);

// Health check — safe to leave in production
app.get('/api/health', (req, res) => {
    res.json({
        success: true,
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// DB test — development only                 // ✅ gated behind env check
if (process.env.NODE_ENV !== 'production') {
    app.get('/api/db-test', async (req, res) => {
        try {
            const [rows] = await pool.query('SELECT 1 + 1 AS result');
            res.json({
                success: true,
                message: 'Database connected',
                result: rows[0].result
            });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
}

// 404 handler — must be after all other routes
// Must be after all routes                   // ✅ added
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.method} ${req.originalUrl} not found`
    });
});

// Global error handler
// Must be after 404, must have 4 params      // ✅ added
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] ${err.stack}`);

    const statusCode = err.statusCode || 500;
    const message = err.isOperational
        ? err.message
        : 'Something went wrong. Please try again.';

    res.status(statusCode).json({
        success: false,
        message
    });
});

// Server Start
const PORT = process.env.PORT || 5000;

// ✅ added error handling for server startup (e.g. port in use)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV} mode`);
}).on('error', (err) => {                     // ✅ handle startup errors
    if (err.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use`);
    } else {
        console.error('Server error:', err.message);
    }
    process.exit(1);
});