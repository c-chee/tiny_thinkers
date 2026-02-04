// controllers/settings.controller.js
const settingsService = require("../services/settings.service");
const contentMap = require("../config/contentMap");

// GET /settings
exports.getSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        const prefs = await settingsService.getPreferences(userId);

        res.render("settings", {
        pageTitle: "Learning Settings",
        layout: "dashboard-layout",
        pageCss: "/css/settings.css",
        pageScript: "/js/settings.js",
        prefs: prefs || {
            grade_level: "K",
            content_type: Object.keys(contentMap).join(","), // all enabled by default
        },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to load settings page");
    }
};

// POST /api/settings
exports.saveSettings = async (req, res) => {
    try {
        const userId = req.user.id;
        let { grade_level, content_type } = req.body;

        if (Array.isArray(content_type)) content_type = content_type.join(",");
        else if (!content_type) content_type = "";

        await settingsService.saveSettings(userId, grade_level, content_type);

        res.redirect("/dashboard");
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save settings");
    }
};
