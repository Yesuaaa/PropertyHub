import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';

const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_ROUNDS = 12;
const TOKEN_EXPIRY_MS = 15 * 60 * 1000;

if (!JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is not defined in .env');
    process.exit(1);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

// REGISTER USER (creates account directly)
export const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required: first_name, last_name, email, password'
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Invalid email format' });
    }

    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
        });
    }

    // Check if email already exists in users table
    const [existing] = await pool.query(
        'SELECT user_id FROM users WHERE email = ?',
        [email]
    );
    if (existing.length > 0) {
        return res.status(409).json({
            success: false,
            message: 'An account with this email already exists'
        });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    try {
        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password_hash, is_verified, verified_at)
             VALUES (?, ?, ?, ?, TRUE, NOW())`,
            [first_name, last_name, email, hashedPassword]
        );
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'An account with this email already exists' });
        }
        throw err;
    }

    return res.status(201).json({
        success: true,
        message: 'Account created successfully. You can now sign in.'
    });
});

// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const [rows] = await pool.query(
        `SELECT user_id, first_name, last_name, email, password_hash, role
         FROM users WHERE email = ? LIMIT 1`,
        [email]
    );

    if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const user = rows[0];

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password' });
    }

    const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: '15m' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: TOKEN_EXPIRY_MS
    });

    return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role
        }
    });
});

// LOGOUT USER
export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.token;

    if (token) {
        await pool.query(
            `INSERT INTO token_blocklist (token, expires_at) VALUES (?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
            [token]
        );
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });

    return res.status(200).json({ success: true, message: 'Logout successful' });
});

// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {
    const [rows] = await pool.query(
        `SELECT user_id, first_name, last_name, email, role FROM users WHERE user_id = ? LIMIT 1`,
        [req.user.userId]
    );

    if (rows.length === 0) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = rows[0];

    return res.status(200).json({
        success: true,
        user: {
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            role: user.role
        }
    });
});
