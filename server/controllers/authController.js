import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import asyncHandler from '../util/asynchandler.js';
import { sendVerificationEmail, sendPasswordResetEmail } from '../services/email.service.js';

const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_ROUNDS = 12;
const TOKEN_EXPIRY_MS = 15 * 60 * 1000;

if (!JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is not defined in .env');
    process.exit(1);
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
const hashOTP = (otp) => crypto.createHash('sha256').update(otp).digest('hex');

// REGISTER USER (stores in pending, does NOT create user yet)
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
    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    // Upsert into pending_registrations
    await pool.query(
        `INSERT INTO pending_registrations (email, first_name, last_name, password_hash, otp_hash, expires_at)
         VALUES (?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
            first_name = VALUES(first_name),
            last_name = VALUES(last_name),
            password_hash = VALUES(password_hash),
            otp_hash = VALUES(otp_hash),
            expires_at = VALUES(expires_at)`,
        [email, first_name, last_name, hashedPassword, hashedOtp, expiresAt]
    );

    sendVerificationEmail(email, otp).catch(err => console.error('Verification email failed:', err));

    return res.status(201).json({
        success: true,
        message: 'Please check your email for a verification code.',
        email
    });
});

// VERIFY OTP (Registration — creates user account only on success)
// @route   POST /api/auth/verify-otp
export const verifyOTP = asyncHandler(async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) {
        return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const hashedOtp = hashOTP(otp);

    const [rows] = await pool.query(
        'SELECT id, email, first_name, last_name, password_hash FROM pending_registrations WHERE email = ? AND otp_hash = ? AND expires_at > NOW()',
        [email, hashedOtp]
    );
    if (rows.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or expired verification code' });
    }

    const pending = rows[0];

    try {
        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password_hash, is_verified, verified_at)
             VALUES (?, ?, ?, ?, TRUE, NOW())`,
            [pending.first_name, pending.last_name, pending.email, pending.password_hash]
        );
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            await pool.query('DELETE FROM pending_registrations WHERE email = ?', [email]);
            return res.status(409).json({ success: false, message: 'An account with this email already exists' });
        }
        throw err;
    }

    await pool.query('DELETE FROM pending_registrations WHERE email = ?', [email]);

    res.status(200).json({ success: true, message: 'Account created and verified successfully.' });
});

// RESEND OTP
// @route   POST /api/auth/resend-otp
export const resendOTP = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const [rows] = await pool.query(
        'SELECT email FROM pending_registrations WHERE email = ? AND expires_at > NOW()',
        [email]
    );
    if (rows.length === 0) {
        return res.status(200).json({ success: true, message: 'If that email exists, a new code has been sent.' });
    }

    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query(
        'UPDATE pending_registrations SET otp_hash = ?, expires_at = ? WHERE email = ?',
        [hashedOtp, expiresAt, email]
    );

    sendVerificationEmail(rows[0].email, otp).catch(err => console.error('Verification email failed:', err));

    res.status(200).json({ success: true, message: 'A new verification code has been sent to your email.' });
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

// FORGOT PASSWORD (sends OTP via email)
// @route   POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const [users] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        return res.status(200).json({ success: true, message: 'If that email exists, we have sent a reset code.' });
    }

    const user = users[0];
    const otp = generateOTP();
    const hashedOtp = hashOTP(otp);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    await pool.query('DELETE FROM otps WHERE user_id = ? AND type = ?', [user.user_id, 'reset']);
    await pool.query(
        'INSERT INTO otps (user_id, type, code, expires_at) VALUES (?, ?, ?, ?)',
        [user.user_id, 'reset', hashedOtp, expiresAt]
    );

    sendPasswordResetEmail(email, otp).catch(err => console.error('Reset email failed:', err));

    res.status(200).json({ success: true, message: 'If that email exists, we have sent a reset code.' });
});

// RESET PASSWORD (verify OTP + new password)
// @route   POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
    const { email, otp, newPassword } = req.body;
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ success: false, message: 'Email, OTP, and new password are required' });
    }

    const [users] = await pool.query('SELECT user_id FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    const userId = users[0].user_id;
    const hashedOtp = hashOTP(otp);

    const [rows] = await pool.query(
        'SELECT id FROM otps WHERE user_id = ? AND type = ? AND code = ? AND expires_at > NOW()',
        [userId, 'reset', hashedOtp]
    );
    if (rows.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or expired reset code' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, BCRYPT_ROUNDS);

    await pool.query('UPDATE users SET password_hash = ? WHERE user_id = ?', [hashedPassword, userId]);
    await pool.query('DELETE FROM otps WHERE user_id = ? AND type = ?', [userId, 'reset']);

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
});
