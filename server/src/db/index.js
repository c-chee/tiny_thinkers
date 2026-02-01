/**
 * Notes:
 * - This is the db connection
 */
require('dotenv').config(); // Loads env variables 

const mysql = require('mysql2/promise'); // MySQL driver

// Creates a connection pool, method used to keep database connections open
// Connection pool reuses DB connections for performance + safety
// Load credentials from environment variables for security
const pool = mysql.createPool({
    host: process.env.DB_HOST,       // Railway public hostname (no port here)
    port: process.env.DB_PORT,       // Railway port (number)
    user: process.env.DB_USER,       // your DB username
    password: process.env.DB_PASSWORD, // your DB password
    database: process.env.DB_NAME,   // your DB name
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection()
    .then(conn => {
        console.log("Connected to Railway MySQL database!");
        conn.release(); // release immediately back to the pool
    })
    .catch(err => {
        console.error("Database connection failed:", err);
    });

module.exports = pool; // Enables async and await DB queries
