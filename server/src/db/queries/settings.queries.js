/**
 * Purpose:
 * - Read/write user learning settings
 * - SQL ONLY
 */
const db = require('../index'); // Imports the shared MySQL connection pool

// Insert or update user settings
exports.save = async (userId, grade, type) => {
    const [result] = await db.query(
        `
        INSERT INTO user_preferences
        (user_id, grade_level, content_type)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
            grade_level = VALUES(grade_level),
            content_type = VALUES(content_type)
        `,
        [userId, grade, type]
    );

    return result;
};

// Get user settings
exports.get = async (userId) => {
    const [rows] = await db.query(
        `
        SELECT grade_level, content_type
        FROM user_preferences
        WHERE user_id = ?
        `,
        [userId]
    );

    return rows[0];
};