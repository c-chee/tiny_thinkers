const db = require("../db");

// Get user preferences
exports.getPreferences = async (userId) => {
    const [rows] = await db.query(
        "SELECT grade_level, content_type FROM user_preferences WHERE user_id = ?",
        [userId]
    );
    return rows[0] || null;
};

// Save user preferences
exports.saveSettings = async (userId, grade_level, content_type) => {
    const [existing] = await db.query(
        "SELECT id FROM user_preferences WHERE user_id = ?",
        [userId]
    );

    if (existing.length) {
        await db.query(
            "UPDATE user_preferences SET grade_level = ?, content_type = ? WHERE user_id = ?",
            [grade_level, content_type, userId]
        );
    } else {
        await db.query(
            "INSERT INTO user_preferences (user_id, grade_level, content_type) VALUES (?, ?, ?)",
            [userId, grade_level, content_type]
        );
    }
};
