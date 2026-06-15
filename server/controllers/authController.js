import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import asyncHandler from '../util/asynchandler.js';
import { sendPasswordResetEmail } from '../services/emailservice.js';
 
// CONSTANTS
const JWT_SECRET = process.env.JWT_SECRET;
const BCRYPT_ROUNDS = 12;
const TOKEN_EXPIRY_MS = 15 * 60 * 1000; // 15 minutes
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex'); //Helper to hash a token for storage
 
if (!JWT_SECRET) {
    console.error('FATAL: JWT_SECRET is not defined in .env');
    process.exit(1);
}
 
// VALIDATORS
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email format check (can be improved with more complex regex if needed)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/; // At least 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char
 
// REGISTER USER
export const registerUser = asyncHandler(async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
 
    // 1. Presence check
    if (!first_name || !last_name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required: first_name, last_name, email, password'
        });
    }
 
    // 2. Email format check
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: 'Invalid email format'
        });
    }
 
    // 3. Password strength check
    if (!passwordRegex.test(password)) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 8 characters and include uppercase, lowercase, number, and special character'
        });
    }
 
    // 4. Hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
 
    // 5. Insert — let the DB UNIQUE constraint handle duplicate emails
    //    No need for a pre-check SELECT (avoids race condition + extra DB round trip)
    try {
        await pool.query(
            `INSERT INTO users (first_name, last_name, email, password_hash)
             VALUES (?, ?, ?, ?)`,
            [first_name, last_name, email, hashedPassword]
        );
    } catch (err) {
        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({
                success: false,
                message: 'An account with this email already exists'
            });
        }
        throw err; // anything else — let asyncHandler forward to errorHandler
    }
 
    // 6. Don't expose insertId or internal data
    return res.status(201).json({
        success: true,
        message: 'Account created successfully'
    });
});
 
// LOGIN USER
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
 
    // 1. Presence check
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Email and password are required'
        });
    }
 
    // 2. Fetch user — SELECT only the columns we need, never SELECT *
    const [rows] = await pool.query(
        `SELECT user_id, first_name, last_name, email, password_hash, role
         FROM users
         WHERE email = ?
         LIMIT 1`,
        [email]
    );
 
    // 3. User not found — same message as wrong password to prevent user enumeration
    if (rows.length === 0) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
 
    const user = rows[0];
 
    // 4. Compare against password_hash (matches the column name in the table)
    const isMatch = await bcrypt.compare(password, user.password_hash);
 
    if (!isMatch) {
        return res.status(401).json({
            success: false,
            message: 'Invalid email or password'
        });
    }
 
    // 5. Sign token — use user_id (matches PK column), include role to avoid
    //    extra DB lookups in middleware on every protected request
    const token = jwt.sign(
        {
            userId: user.user_id,
            role: user.role
        },
        JWT_SECRET,
        { expiresIn: '15m' }
    );
 
    // 6. Send token as HTTP-only cookie — JS cannot read it (XSS protection)
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,          // must be false FOR LOCAL HOST (no HTTPS)
        sameSite: 'lax',                             // CSRF protection
        maxAge: TOKEN_EXPIRY_MS
    });
 
    // 7. Return token AND user info
    return res.status(200).json({
        success: true,
        message: 'Login successful',
        token,                               // add this line
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
        // Blocklist the token so it can't be reused before its natural expiry.
        // The cleanup job (or a scheduled query) should periodically delete
        // rows WHERE expires_at < NOW() to keep this table small.
        await pool.query(
            `INSERT INTO token_blocklist (token, expires_at)
             VALUES (?, DATE_ADD(NOW(), INTERVAL 15 MINUTE))`,
            [token]
        );
    }
 
    // Clear the cookie with the same options it was set with
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
    });
 
    return res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
});

// GET CURRENT USER
export const getMe = asyncHandler(async (req, res) => {
    // req.user is attached by authenticate middleware
    const [rows] = await pool.query(
        `SELECT user_id, first_name, last_name, email, role
         FROM users
         WHERE user_id = ?
         LIMIT 1`,
        [req.user.userId]
    );

    if (rows.length === 0) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }

    const user = rows[0];

    return res.status(200).json({
        success: true,
        user: {
            firstName: user.first_name,
            lastName:  user.last_name,
            email:     user.email,
            role:      user.role
        }
    });
});
 
// FORGOT PASSWORD
// @route   POST /api/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Find user
    const [users] = await pool.query('SELECT user_id, first_name, last_name FROM users WHERE email = ?', [email]);
    if (users.length === 0) {
        // For security, don't reveal that email doesn't exist
        return res.status(200).json({ success: true, message: 'If that email exists, we have sent a reset link.' });
    }

    const user = users[0];
    const userName = `${user.first_name} ${user.last_name}`;

    // Generate a secure random token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const hashedToken = hashToken(resetToken);
    const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    // Delete any existing unused tokens for this user
    await pool.query('DELETE FROM password_resets WHERE user_id = ?', [user.user_id]);

    // Store the hashed token
    await pool.query(
        'INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)',
        [user.user_id, hashedToken, expiresAt]
    );

    // Send email (non-blocking)
    sendPasswordResetEmail(email, resetToken, userName).catch(err => console.error('Reset email failed:', err));

    res.status(200).json({ success: true, message: 'If that email exists, we have sent a reset link.' });
});

// RESET PASSWORD
// @route   POST /api/auth/reset-password
export const resetPassword = asyncHandler(async (req, res) => {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
        return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }

    // Hash the received token to compare with stored hash
    const hashedToken = hashToken(token);

    // Find valid token
    const [rows] = await pool.query(
        'SELECT user_id, expires_at FROM password_resets WHERE token = ? AND expires_at > NOW()',
        [hashedToken]
    );
    if (rows.length === 0) {
        return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    }

    const { user_id } = rows[0];

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password
    await pool.query('UPDATE users SET password_hash = ? WHERE user_id = ?', [hashedPassword, user_id]);

    // Delete all used reset tokens for this user
    await pool.query('DELETE FROM password_resets WHERE user_id = ?', [user_id]);

    res.status(200).json({ success: true, message: 'Password has been reset successfully' });
});