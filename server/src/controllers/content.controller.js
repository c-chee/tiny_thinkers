// controllers/content.controller.js
const db = require("../db");

exports.getContentPage = async (req, res) => {
    try {
        const userId = 1; // TEMP until auth is ready
        const type = req.params.type;

        // Get user grade
        const [prefsRows] = await db.query(
        "SELECT grade_level FROM user_preferences WHERE user_id = ?",
        [userId]
        );

        const grade = prefsRows.length ? prefsRows[0].grade_level : "K";

        // Fetch content for grade and type
        const [content] = await db.query(
        `SELECT * FROM content WHERE grade_level = ? AND content_type = ?`,
        [grade, type]
        );

        res.render("content", {
        pageTitle: `${type} — Grade ${grade}`,
        layout: "dashboard-layout",
        type,
        grade,
        content
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Content error");
    }
};
