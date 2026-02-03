// controllers/dashboard.controller.js
const db = require("../db");
const contentMap = require("../config/contentMap");

// Tiles that should always show on the dashboard
const alwaysVisibleTiles = ["settings", "resources", "volunteer"];

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch user preferences from DB
        const [prefsRows] = await db.query(
            "SELECT grade_level, content_type FROM user_preferences WHERE user_id = ?",
            [userId]
        );

        // Default content types
        let userContentTypes = Object.keys(contentMap);

        if (prefsRows.length && prefsRows[0].content_type) {
            userContentTypes = prefsRows[0].content_type.split(",");
        }

        // Merge user content + always visible tiles
        const tilesToRender = Array.from(
            new Set([...userContentTypes, ...alwaysVisibleTiles])
        );

        // Map tile keys to actual contentMap objects
        const tiles = tilesToRender
        .map((key) => contentMap[key])
        .filter(Boolean); // filter out any missing keys

        res.render("dashboard", {
            layout: "dashboard-layout",
            pageTitle: "Tiny Thinkers | Dashboard",
            tiles,
            homeLink: "/dashboard",
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Dashboard error");
    }
};
