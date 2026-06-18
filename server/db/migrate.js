import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildSslConfig } from '../config/ssl.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

// Only numbered files (001_*.sql ... 999_*.sql) are treated as migrations.
// This automatically excludes sample files like FULLDATYABASE.sql.
const MIGRATION_FILENAME = /^\d{3}_.*\.sql$/i;

// MySQL error codes / messages that indicate a change is ALREADY applied.
// Older migration files in this repo (e.g. ALTER TABLE ... ADD COLUMN) are
// not idempotent, so on a database that was bootstrapped manually these will
// fail — we treat that as "already applied" and move on instead of aborting.
const BENIGN_ERROR_CODES = new Set([
    1050, // ER_TABLE_EXISTS_ERROR
    1060, // ER_DUP_FIELDNAME   (column already exists)
    1061, // ER_DUP_KEYNAME     (index already exists)
    1068  // ER_MULTIPLE_PRI_KEY
]);

function isAlreadyAppliedError(err) {
    if (!err) return false;
    if (BENIGN_ERROR_CODES.has(Number(err.errno))) return true;
    return /already exists/i.test(String(err.message || ''));
}

async function runMigrations() {
    if (!fs.existsSync(MIGRATIONS_DIR)) {
        console.log('ℹ️  No migrations directory found, skipping migrations');
        return;
    }

    const files = fs
        .readdirSync(MIGRATIONS_DIR)
        .filter((f) => MIGRATION_FILENAME.test(f))
        .sort();

    if (files.length === 0) {
        console.log('ℹ️  No migration files found');
        return;
    }

    // Separate connection: migration files may contain multiple statements,
    // so we need multipleStatements: true which we don't want on the app pool.
    const sslConfig = buildSslConfig();
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true,
        ...(sslConfig && { ssl: sslConfig })
    });

    try {
        await connection.query(`
            CREATE TABLE IF NOT EXISTS schema_migrations (
                filename VARCHAR(255) PRIMARY KEY,
                applied_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
        `);

        const [rows] = await connection.query('SELECT filename FROM schema_migrations');
        const applied = new Set(rows.map((r) => r.filename));

        for (const file of files) {
            if (applied.has(file)) continue;

            const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8').trim();
            // Empty placeholder files (e.g. 001..003 in this repo) just get marked done.
            if (!sql) {
                await connection.query(
                    'INSERT IGNORE INTO schema_migrations (filename) VALUES (?)',
                    [file]
                );
                console.log(`⏭️  Migration empty (marked done): ${file}`);
                continue;
            }

            try {
                await connection.query(sql);
                await connection.query(
                    'INSERT INTO schema_migrations (filename) VALUES (?)',
                    [file]
                );
                console.log(`✅ Migration applied: ${file}`);
            } catch (err) {
                if (isAlreadyAppliedError(err)) {
                    await connection.query(
                        'INSERT IGNORE INTO schema_migrations (filename) VALUES (?)',
                        [file]
                    );
                    console.log(`⏭️  Migration already applied (skipped): ${file}`);
                } else {
                    console.error(`❌ Migration failed: ${file} — ${err.message}`);
                    throw err;
                }
            }
        }

        console.log('✅ Migrations complete');
    } finally {
        await connection.end();
    }
}

export default runMigrations;
