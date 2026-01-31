const settingsService = require("../services/settings.service");
const contentService = require("../services/content.service");
const dictService = require("../services/dictionary.service");
const contentMap = require("../config/contentMap");

// GET /api/dashboard
// GET /api/dashboard?word=cheese

// exports.getDashboard = async (req, res) => {
//     const prefs = await settingsService.getPreferences(req.user.id); // Reads the suth user ID from req.user and fetcches info (grade, content, etc)

//     const content = await contentService.getContent(prefs); // Grabs 1sy AP learning content by its preferenes 

//     // Calls the dictionary api 
//     const word = req.query.word || "learn"; // fallback
//     const wordData = await dictService.lookup(word);

//     res.json({ content, dictionary: wordData }); // Dashboard ress, sends all the info back to the front 
// };

function parseContentTypes(contentType) {
    if (!contentType || contentType === "all") {
        return Object.keys(contentMap);
    }

    return contentType.split(",").map(c => c.trim());
}

exports.getDashboard = async (req, res) => {
    try {
        const prefs = await settingsService.getPreferences(req.user.id);

        const grade = prefs?.grade_level || "K";
        const enabledTypes = parseContentTypes(prefs?.content_type);

        const boxes = enabledTypes
        .filter(type => contentMap[type])
        .map(type => ({
            key: type,
            label: contentMap[type].label,
            route: contentMap[type].route
        }));

        res.render("dashboard", {
        pageTitle: "Dashboard",
        grade_level: grade,
        boxes
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Dashboard failed to load");
    }
};