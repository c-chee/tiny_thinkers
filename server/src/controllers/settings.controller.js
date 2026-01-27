const prefService = require("../services/settings.service");

exports.savePreferences = async (req, res) => {
    const userId = req.user.id;
    const { grade_level, content_type } = req.body;

    await prefService.savePreferences(userId, grade_level, content_type);

    res.json({ message: "Preferences saved" });
};
