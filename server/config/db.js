const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    max: 20, // maximum number of clients in the pool
    idleTimeoutMillis: 30000, // close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // return an error after 2 seconds if connection could not be established
});

// Test the database connection
pool.connect(err, client, release) => 
{
    if (err) {
        console.error('Error acquiring client', err.stack);
    } else {
        console.log('Database connection successful');
    }
    release();


}

