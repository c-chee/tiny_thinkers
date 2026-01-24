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
    return rows[0];
};

// Create new user
exports.createUser = async (email, passwordHash) => {
    const [result] = await db.query(
        'INSERT INTO users (email, password_hash) VALUES (?, ?)',
        [email, passwordHash]
    );
    return result.insertId;
};
