import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const JWT_SECRET = process.env.JWT_SECRET;

// ─── authenticate ─────────────────────────────────────────────────────────────
// Reads the JWT from the HTTP-only cookie, verifies it, checks the blocklist,
// then attaches the decoded payload to req.user for downstream middleware/controllers.
// ─────────────────────────────────────────────────────────────────────────────
export const authenticate = async (req, res, next) => {
    try {
        const token = req.cookies?.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        // 1. Verify signature and expiry
        const decoded = jwt.verify(token, JWT_SECRET);

        // 2. Check blocklist — catches logged-out tokens that haven't expired yet
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
        
        // Optional: Check if user still exists and is active — adds DB hit but improves security
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
        // 3. Attach user info — userId matches user_id from the users table
        req.user = {
            userId: decoded.userId,
            role:   decoded.role
        };

        next();
    } catch (err) {
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
        next(err); // unexpected error — forward to errorHandler
    }
};

// ─── authorize ────────────────────────────────────────────────────────────────
// Call after authenticate. Pass the roles that are allowed to access the route.
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