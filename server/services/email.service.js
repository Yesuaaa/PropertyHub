import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const FROM_EMAIL = process.env.EMAIL_FROM || 'propertyhubofficial001@gmail.com';
const FROM_NAME = process.env.EMAIL_FROM_NAME || 'PropertyHub';
const BREVO_API_KEY = process.env.BREVO_API_KEY;

const sendEmail = async (to, subject, html) => {
    if (!BREVO_API_KEY) {
        console.error('BREVO_API_KEY not configured. Email not sent.');
        return { success: false, error: 'Email service not configured' };
    }

    try {
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
            console.error('Brevo API error:', response.status, errorText);
            return { success: false, error: `Brevo API error (${response.status}): ${errorText}` };
        }

        const data = await response.json();
        console.log(`Email sent to ${to}`);
        return { success: true, id: data.messageId };
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
    return sendEmail(email, 'PropertyHub - Email Verification', html);
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
    return sendEmail(email, 'PropertyHub - Password Reset', html);
};
