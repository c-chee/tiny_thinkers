/**
 * Notes:
 * - In only SQL
 * - 'How to talk to db'
 */
const db = require('../index');

// Find user by email
exports.findByEmail = async (email) => {
    const [rows] = await db.query(
        'SELECT * FROM users WHERE email = ?',
        [email]
    );

    return rows[0]; //returns the one user row at the top
};

// Create new user
// Inserts into the DB
exports.createUser = async (email, passwordHash, first_name, last_name) => {
    const [result] = await db.query(
        `INSERT INTO users (email, password_hash, first_name, last_name)
        VALUES (?, ?, ?, ?)`,
        [email, passwordHash, first_name, last_name]
    );

    return result.insertId; // Returns the inserted ID
};

