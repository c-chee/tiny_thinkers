/**
 * Notes:
 * - This is the db connection
 */
require('dotenv').config(); // Loads env variables 

const mysql = require('mysql2'); // MySQL driver

// Creates a connection pool, method used to keep database connections open
// Connection pool reuses DB connections for performance + safety
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

module.exports = pool.promise(); // Enables async and await DB queries
