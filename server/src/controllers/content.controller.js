const db = require("../db");

exports.getContentPage = async (req, res) => {
    try {
        const userId = 1; // temp until auth ready
        const type = req.params.type;

        // get user preferences
        const [prefs] = await db.query(
            "SELECT grade_level FROM user_preferences WHERE user_id = ?",
            [userId]
        );

        const grade = prefs.length ? prefs[0].grade_level : "K";

        // fetch matching content
            const [content] = await db.query(
            `SELECT * FROM content
            WHERE grade_level = ? AND content_type = ?`,
            [grade, type]
        );

        res.render("content", {
            pageTitle: `${type} content`,
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
