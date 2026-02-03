const settingsService = require("../services/settings.service"); // Imports the service that talks to the DB


// GET /api/settings
exports.getSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        const prefs = await settingsService.getPreferences(userId);

        res.json(prefs || {});
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to load settings" });
    }
};

// POST /api/settings
exports.saveSettings = async (req, res) => {
    try {
        const userId = req.user.id;

        let { grade_level, content_type } = req.body;

        // checkbox array → CSV
        if (Array.isArray(content_type)) {
            content_type = content_type.join(",");
        }

        await settingsService.saveSettings(
            userId,
            grade_level,
            content_type
        );

        res.redirect("/dashboard");
        
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to save settings");
    }
};