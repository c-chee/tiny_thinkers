// controllers/dashboard.controller.js
const db = require("../db");

// List of all possible content types
const allContentTypes = ["reading", "alphabet", "vocab", "spelling", "dictionary"];

exports.getDashboard = async (req, res) => {
    try {
        // TEMP user until auth is ready
        // const userId = 1;

        // FOR actual user
        const userId = req.user.id;

        // Fetch user preferences
        const [prefs] = await db.query(
            "SELECT * FROM user_preferences WHERE user_id = ?",
            [userId]
        );

        let contentTypes = ["reading", "dictionary", "spelling", "cards"];

        if (prefs.length && prefs[0].content_type !== "all") {
            contentTypes = prefs[0].content_type.split(",");
        }

        res.render("dashboard", {
            layout: "dashboard-layout",
            pageTitle: "Tiny Thinkers | Dashboard",
            contentTypes,
            homeLink: "/dashboard"
        });


    } catch (err) {
        console.error(err);
        res.status(500).send("Dashboard error");
    }
};
