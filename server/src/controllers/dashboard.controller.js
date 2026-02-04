const db = require("../db");
const contentMap = require("../config/contentMap");

exports.getDashboard = async (req, res) => {
    try {
        const userId = req.user.id;

        const [prefsRows] = await db.query(
            "SELECT content_type FROM user_preferences WHERE user_id = ?",
            [userId]
        );

        let contentTypes = Object.keys(contentMap); // default all

        if (prefsRows.length && prefsRows[0].content_type) {
            contentTypes = prefsRows[0].content_type.split(",");
        }

        const tiles = contentTypes.map(type => contentMap[type]).filter(Boolean);

        // Always visible tiles
        tiles.push(
            { label: "Resources", route: "/resources", class: "tile-resources", description: "Additional resources." },
            { label: "Volunteer", route: "/volunteer", class: "tile-volunteer", description: "Get involved." },
            { label: "Settings", route: "/settings", class: "tile-settings", description: "Update grade level and content." }
        );

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
