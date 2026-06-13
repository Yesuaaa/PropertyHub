import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET;

// ─── authenticate ─────────────────────────────────────────────────────────────
// Reads JWT from Authorization header (Bearer) OR HTTP‑only cookie.
// Verifies token, checks blocklist, user existence/active status.
// Attaches decoded payload to req.user.
// ─────────────────────────────────────────────────────────────────────────────
export const authenticate = async (req, res, next) => {
    try {
        // 1. Extract token – prefer Authorization header, fallback to cookie
        let token = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.split(' ')[1];
        }
        if (!token && req.cookies?.token) {
            token = req.cookies.token;
        }

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // 2. Verify JWT signature and expiry
        const decoded = jwt.verify(token, JWT_SECRET);

        // 3. Check token blocklist (logout)
        const [blocked] = await pool.query(
            'SELECT id FROM token_blocklist WHERE token = ? LIMIT 1',
            [token]
        );
        if (blocked.length > 0) {
            return res.status(401).json({
                success: false,
                message: 'Token has been invalidated. Please log in again.'
            });
        }

        // 4. Verify user still exists and is active
        const [rows] = await pool.query(
            'SELECT user_id, role, is_active FROM users WHERE user_id = ? LIMIT 1',
            [decoded.userId]
        );
        if (rows.length === 0 || !rows[0].is_active) {
            return res.status(403).json({
                success: false,
                message: 'Account not found or deactivated.'
            });
        }

        // 5. Attach user info for downstream use
        req.user = {
            userId: decoded.userId,
            role: decoded.role
        };

        next();
    } catch (err) {
        // Handle JWT specific errors
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({
                success: false,
                message: 'Session expired. Please log in again.'
            });
        }
        if (err.name === 'JsonWebTokenError') {
            return res.status(401).json({
                success: false,
                message: 'Invalid token.'
            });
        }
        next(err); // Unexpected error → errorHandler
    }
};

// ─── authorize ────────────────────────────────────────────────────────────────
// Role‑based access control – call after authenticate.
// Usage: router.get('/admin', authenticate, authorize('admin'), handler)
//        router.get('/staff', authenticate, authorize('admin', 'staff'), handler)
// ─────────────────────────────────────────────────────────────────────────────
export const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Not authenticated.'
            });
        }
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                success: false,
                message: 'You do not have permission to perform this action.'
            });
        }
        next();
    };
};