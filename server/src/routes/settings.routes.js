const express = require("express");
const router = express.Router();
const settingsController = require("../controllers/settings.controller");
const authMiddleware = require("../middleware/auth.middleware");

// GET /api/settings
router.get("/", authMiddleware, settingsController.getSettings);

// POST /api/settings
router.post("/", authMiddleware, settingsController.saveSettings);

module.exports = router;
