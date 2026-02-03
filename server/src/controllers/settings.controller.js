const settingsService = require("../services/settings.service"); // Imports the service that talks to the DB

// POST /api/settings
exports.saveSettings = async (req, res) => {
    const userId = req.user.id;

    let { grade_level, content_type } = req.body;

    // Convert checkbox array to CSV
    if (Array.isArray(content_type)) {
        content_type = content_type.join(",");
    }

    await settingsService.saveSettings(
        userId,
        grade_level,
        content_type
    );

    res.redirect("/dashboard");
};
