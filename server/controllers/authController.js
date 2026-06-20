import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import asyncHandler from '../util/asyncHandler.js';
import {
    cleanText,
    emailRegex,
    nameRegex,
    normalizeEmail,
    normalizeName,
    validatePassword
} from '../util/validation.js';

const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_ROUNDS = 12;
const TOKEN_EXPIRY_MS = 15 * 60 * 1000;

if (!JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is not defined in .env');
    process.exit(1);
}

// REGISTER USER (creates account directly)
export const registerUser = asyncHandler(async (req, res) => {
    const firstName = normalizeName(req.body.first_name);
    const lastName = normalizeName(req.body.last_name);
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'First name, last name, email, and password are required.'
        });
    }

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
        return res.status(400).json({
            success: false,
            message: 'Names must be 2-60 characters and use letters, spaces, hyphens, or apostrophes only.'
        });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const passwordError = validatePassword(password, [firstName, lastName, email.split('@')[0]]);
    if (passwordError) {
        return res.status(400).json({ success: false, message: passwordError });
    }

    const [existing] = await pool.query(
        'SELECT user_id FROM users WHERE LOWER(email) = ? LIMIT 1',
        [email]
    );
    if (existing.length > 0) {
        return res.status(409).json({
            success: false,
            message: 'An account with this email already exists. Please sign in instead.'
        });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);

    try {
        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password_hash, is_verified, verified_at)
             VALUES (?, ?, ?, ?, TRUE, NOW())`,
            [firstName, lastName, email, hashedPassword]
        );
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ success: false, message: 'An account with this email already exists. Please sign in instead.' });
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
    const email = normalizeEmail(req.body.email);
    const password = String(req.body.password || '');

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Please enter a valid email address.' });
    }

    const [rows] = await pool.query(
        `SELECT user_id, first_name, last_name, email, password_hash, role, is_active
         FROM users WHERE LOWER(email) = ? LIMIT 1`,
        [email]
    );

    if (rows.length === 0) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const user = rows[0];

    if (!user.is_active) {
        return res.status(403).json({ success: false, message: 'This account is currently deactivated.' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        JWT_SECRET,
        { expiresIn: '15m' }
    );

    res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: TOKEN_EXPIRY_MS
    });

    return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,
        user: {
            id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role
        }
    });
});

// LOGOUT USER
export const logoutUser = asyncHandler(async (req, res) => {
    const token = req.cookies?.token || cleanText(req.headers.authorization?.replace('Bearer ', ''), 2000);

    if (token) {
        await pool.query(
            `INSERT INTO token_blocklist (token, expires_at) VALUES (?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
            [token]
        );
    }

    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax'
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
            id: user.user_id,
            firstName: user.first_name,
            lastName: user.last_name,
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            role: user.role
        }
    });
});
