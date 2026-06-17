import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

dns.setDefaultResultOrder('ipv4first');

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@yourdomain.com';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'NetCafe Hub';

let transporter = null;

async function initTransporter() {
    if (transporter) return transporter;
    if (!process.env.SMTP_HOST) {
        console.warn('SMTP not configured. Emails will not be sent.');
        return null;
    }

    let smtpHost = process.env.SMTP_HOST;

    try {
        const resolved = await dns.promises.lookup(process.env.SMTP_HOST, { family: 4 });
        smtpHost = resolved.address;
        console.log(`SMTP resolved ${process.env.SMTP_HOST} -> ${smtpHost} (IPv4)`);
    } catch (err) {
        console.warn(`Could not resolve IPv4 for ${process.env.SMTP_HOST}, using hostname: ${err.message}`);
    }

    transporter = nodemailer.createTransport({
        host: smtpHost,
        port: parseInt(process.env.SMTP_PORT) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        connectionTimeout: 10000,
        greetingTimeout: 10000,
        socketTimeout: 15000,
        tls: {
            servername: process.env.SMTP_HOST,
        },
    });

    return transporter;
}

const sendEmail = async (to, subject, html) => {
    const t = await initTransporter();
    if (!t) {
        console.warn('SMTP not configured. Email not sent.');
        return { success: false, error: 'SMTP not configured' };
    }

    try {
        const info = await t.sendMail({
            from: `${FROM_NAME} <${FROM_EMAIL}>`,
            to,
            subject,
            html,
        });
        console.log(`Email sent to ${to}: ${info.messageId}`);
        return { success: true, id: info.messageId };
    } catch (error) {
        console.error('Email send error:', error.message);
        return { success: false, error: error.message };
    }
};

export const sendVerificationEmail = async (email, otp) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Verify Your Email</h2>
            <p>Thank you for creating a NetCafe Hub account. Use the code below to verify your email:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 0; background: #f5f3ef; border-radius: 8px; text-align: center;">
                ${otp}
            </div>
            <p style="color: #8fa3b0;">This code expires in 10 minutes.</p>
            <hr>
            <p style="color: #8fa3b0; font-size: 14px;">Property Hub Team</p>
        </div>
    `;
    return sendEmail(email, 'Property Hub - Email Verification', html);
};

export const sendPasswordResetEmail = async (email, otp) => {
    const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px;">
            <h2>Password Reset</h2>
            <p>Use the code below to reset your Property Hub password:</p>
            <div style="font-size: 32px; font-weight: bold; letter-spacing: 8px; padding: 16px 0; background: #f5f3ef; border-radius: 8px; text-align: center;">
                ${otp}
            </div>
            <p style="color: #8fa3b0;">This code expires in 10 minutes.</p>
            <p style="color: #8fa3b0;">If you didn't request this, please ignore this email.</p>
            <hr>
            <p style="color: #8fa3b0; font-size: 14px;">Property Hub Team</p>
        </div>
    `;
    return sendEmail(email, 'Property Hub - Password Reset', html);
};
