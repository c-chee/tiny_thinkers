//server/src/routes/settings.routes.js
const express = require("express");
const router = express.Router();

const settingsController = require("../controllers/settings.controller");
const authMiddleware = require("../middleware/auth.middleware");

// Save settings
router.post("/", authMiddleware, settingsController.saveSettings);

module.exports = router;
