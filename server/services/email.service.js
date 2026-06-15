import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

// Verify connection on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('SMTP connection error:', error);
    } else {
        console.log('SMTP server ready');
    }
});

/**
 * Send a generic email
 */
export const sendEmail = async (to, subject, text, html = null) => {
    try {
        const mailOptions = {
            from: process.env.EMAIL_FROM,
            to,
            subject,
            text,
            ...(html && { html }),
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${to}: ${info.messageId}`);
        return { success: true, messageId: info.messageId };
    } catch (error) {
        console.error('Email send error:', error);
        return { success: false, error: error.message };
    }
};

/**
 * Send password reset email
 * @param {string} to - user email
 * @param {string} resetToken - plain token (not hashed) to include in link
 * @param {string} userName - user's name
 */

// SUBJECT FOR CHANGE PA TO KAYO NA BAHALA
export const sendPasswordResetEmail = async (to, resetToken, userName) => {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
    const subject = 'Password Reset Request';
    const text = `Hello ${userName},\n\nYou requested a password reset. Click the link below to reset your password:\n${resetLink}\n\nIf you didn't request this, please ignore this email.\n\nPropertyHub Team`;
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Password Reset</h2>
            <p>Hello ${userName},</p>
            <p>You requested a password reset. Click the button below to reset your password:</p>
            <a href="${resetLink}" style="display: inline-block; padding: 10px 20px; background-color: #e05a30; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a>
            <p>If the button doesn't work, copy and paste this link into your browser:</p>
            <p>${resetLink}</p>
            <p>If you didn't request this, please ignore this email.</p>
            <hr>
            <p>PropertyHub Team</p>
        </div>
    `;
    return sendEmail(to, subject, text, html);
};