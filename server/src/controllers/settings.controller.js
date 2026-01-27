const settingsService = require("../services/settings.service"); // Imports the service that talks to the DB

// POST /api/settings
exports.saveSettings = async (req, res) => {
    const userId = req.user.id; // USer is from the JWT middleware

    const { grade_level, content_type } = req.body; // Reads the frontend settings form data

    await settingsService.saveSettings(userId, grade_level, content_type); // Saves settings to DB

    res.json({ message: "Settings saved" }); // Confirmation res
};
