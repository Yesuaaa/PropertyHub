import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

// Shared SSL configuration builder. Reads DB_SSL / DB_SSL_CA_PATH from the
// environment and is used by both the query pool (config/db.js) and the
// migration runner (db/migrate.js) so SSL behavior stays consistent.
export function buildSslConfig() {
    if (process.env.DB_SSL !== 'true') return null;

    const sslConfig = {};

    // CA certificate provided → strict validation.
    if (process.env.DB_SSL_CA_PATH) {
        try {
            sslConfig.ca = fs.readFileSync(process.env.DB_SSL_CA_PATH);
            sslConfig.rejectUnauthorized = true;
            console.log('✅ Using CA certificate for SSL');
        } catch (err) {
            console.error('❌ Error reading CA certificate:', err.message);
        }
    }
    // No CA path in development → accept self-signed certificates.
    else if (process.env.NODE_ENV !== 'production') {
        sslConfig.rejectUnauthorized = false;
        console.log('⚠️  SSL certificate validation disabled (development mode)');
    }

    return sslConfig;
}
