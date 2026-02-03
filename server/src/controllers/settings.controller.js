const settingsService = require("../services/settings.service"); // Imports the service that talks to the DB
const contentMap = require("../config/contentMap");

// GET /settings
exports.getSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        const prefs = await settingsService.getPreferences(userId);

        const contentOptions = Object.keys(contentMap).map(key => ({
            key,
            ...contentMap[key],
        }));

        res.render("settings", {
            layout: "dashboard-layout",
            pageTitle: "Learning Settings",
            pageCss: "/css/settings.css",
            pageScript: "/js/settings.js",
            homeLink: "/dashboard",
            contentOptions,
            prefs: prefs || {
                grade_level: "K",
                content_type: Object.keys(contentMap).join(","), // all checked
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load settings");
    }
};

// POST /api/settings
exports.saveSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        let { grade_level, content_type } = req.body;

        // Handle multiple or single checkboxes
        if (Array.isArray(content_type)) {
            content_type = content_type.join(",");
        } else if (!content_type) {
            content_type = "";
        }

        await settingsService.saveSettings(userId, grade_level, content_type);

        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save settings");
    }
};
