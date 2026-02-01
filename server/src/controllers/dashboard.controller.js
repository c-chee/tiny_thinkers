// const db = require("../db");

// exports.getDashboard = async (req, res) => {
//     try {
//         // TEMP fake user until auth exists
//         const userId = 1;

//         const [prefs] = await db.query(
//         "SELECT * FROM user_preferences WHERE user_id = ?",
//         [userId]
//         );

//         let contentTypes = ["reading", "dictionary", "spelling", "cards"];

//         if (prefs.length && prefs[0].content_type !== "all") {
//         contentTypes = prefs[0].content_type.split(",");
//         }

//         res.render("dashboard", {
//         layout: "dashboard-layout",
//         pageTitle: "Dashboard",
//         contentTypes
//         });

//     } catch (err) {
//         console.error(err);
//         res.status(500).send("Dashboard error");
//     }
// };

// controllers/dashboard.controller.js
const db = require("../db");

// List of all possible content types
const allContentTypes = ["reading", "alphabet", "vocab", "spelling", "dictionary"];

exports.getDashboard = async (req, res) => {
    try {
        // TEMP user until auth is ready
        const userId = 1;

        // Fetch user preferences
        const [prefsRows] = await db.query(
        "SELECT * FROM user_preferences WHERE user_id = ?",
        [userId]
        );

        let contentTypes = allContentTypes;

        if (prefsRows.length && prefsRows[0].content_type !== "all") {
        contentTypes = prefsRows[0].content_type.split(",");
        }

        res.render("dashboard", {
        layout: "dashboard-layout",
        pageTitle: "Dashboard",
        contentTypes
        });

    } catch (err) {
        console.error(err);
        res.status(500).send("Dashboard error");
    }
};
