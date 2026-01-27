const db = require('../index');

exports.save = async (userId, grade, type) => {
    return db.query(
        `INSERT INTO user_preferences (user_id, grade_level, content_type)
        VALUES (?, ?, ?)
        ON DUPLICATE KEY UPDATE
        grade_level = VALUES(grade_level),
        content_type = VALUES(content_type)`,
        [userId, grade, type]
    );
};

exports.get = async (userId) => {
    return db.query(
        'SELECT * FROM user_preferences WHERE user_id = ?',
        [userId]
    );
};
