const settingsService = require("../services/settings.service");
const contentService = require("../services/content.service");
const dictService = require("../services/dictionary.service");

// GET /api/dashboard
// GET /api/dashboard?word=cheese
exports.getDashboard = async (req, res) => {
    const prefs = await settingsService.getPreferences(req.user.id); // Reads the suth user ID from req.user and fetcches info (grade, content, etc)

    const content = await contentService.getContent(prefs); // Grabs 1sy AP learning content by its preferenes 

    // Calls the dictionary api 
    const word = req.query.word || "learn"; // fallback
    const wordData = await dictService.lookup(word);

    res.json({ content, dictionary: wordData }); // Dashboard ress, sends all the info back to the front 
};
