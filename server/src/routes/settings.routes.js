// routes/settings.routes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const settingsController = require("../controllers/settings.controller");

// Save settings
router.post("/", authMiddleware, settingsController.saveSettings);

module.exports = router;
