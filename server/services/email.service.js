import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const FROM_EMAIL = process.env.EMAIL_FROM || 'propertyhubofficial001@gmail.com';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'PropertyHub';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

let smtpTransporter = null;

function getSmtpTransporter() {
    if (smtpTransporter) return smtpTransporter;
    if (!process.env.SMTP_HOST) return null;

    smtpTransporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });
    return smtpTransporter;
}

const sendEmailViaBrevo = async (to, subject, html) => {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
            'api-key': BREVO_API_KEY,
            'Content-Type': 'application/json',
            'accept': 'application/json',
        },
        body: JSON.stringify({
            sender: { name: FROM_NAME, email: FROM_EMAIL },
            to: [{ email: to }],
            subject,
            htmlContent: html,
        }),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Brevo API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    return { success: true, id: data.messageId };
};

const sendEmailViaSmtp = async (to, subject, html) => {
    const transporter = getSmtpTransporter();
    if (!transporter) {
        return { success: false, error: 'SMTP not configured' };
    }

    const info = await transporter.sendMail({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to,
        subject,
        html,
    });
    return { success: true, id: info.messageId };
};

const sendEmail = async (to, subject, html) => {
    try {
        if (BREVO_API_KEY) {
            return await sendEmailViaBrevo(to, subject, html);
        }
        return await sendEmailViaSmtp(to, subject, html);
    } catch (error) {
        console.error('Email send error:', error.message);
        return { success: false, error: error.message };
    }
};

export const sendVerificationEmail = async (email, otp) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Verify Your Email</h2>
            <p>Thank you for creating a PropertyHub account. Use the code below to verify your email:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 0; background: #f5f3ef; border-radius: 8px; text-align: center;">
                ${otp}
            </div>
            <p style="color: #8fa3b0;">This code expires in 10 minutes.</p>
            <hr>
            <p style="color: #8fa3b0; font-size: 14px;">Property Hub Team</p>
        </div>
    `;
    const result = await sendEmail(email, 'PropertyHub - Email Verification', html);
    if (result.success) console.log(`Verification email sent to ${email}`);
    return result;
};

export const sendPasswordResetEmail = async (email, otp) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Password Reset</h2>
            <p>Use the code below to reset your PropertyHub password:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 0; background: #f5f3ef; border-radius: 8px; text-align: center;">
                ${otp}
            </div>
            <p style="color: #8fa3b0;">This code expires in 10 minutes.</p>
            <p style="color: #8fa3b0;">If you didn't request this, please ignore this email.</p>
            <hr>
            <p style="color: #8fa3b0; font-size: 14px;">Property Hub Team</p>
        </div>
    `;
    const result = await sendEmail(email, 'PropertyHub - Password Reset', html);
    if (result.success) console.log(`Reset email sent to ${email}`);
    return result;
};
