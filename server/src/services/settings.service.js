// services/settings.service.js
const db = require("../db");

// Get user preferences
exports.getPreferences = async (userId) => {
    const [rows] = await db.query(
        "SELECT grade_level, content_type FROM user_preferences WHERE user_id = ?",
        [userId]
    );

    if (!rows.length) return null;

    return {
        grade_level: rows[0].grade_level,
        content_type: rows[0].content_type,
    };
};

// Save/update user preferences
exports.saveSettings = async (userId, grade_level, content_type) => {
    const [rows] = await db.query(
        "SELECT user_id FROM user_preferences WHERE user_id = ?",
        [userId]
    );

    if (rows.length) {
        // Update existing
        await db.query(
        "UPDATE user_preferences SET grade_level = ?, content_type = ? WHERE user_id = ?",
        [grade_level, content_type, userId]
        );
    } else {
        // Insert new
        await db.query(
        "INSERT INTO user_preferences (user_id, grade_level, content_type) VALUES (?, ?, ?)",
        [userId, grade_level, content_type]
        );
    }
};
