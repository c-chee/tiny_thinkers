/**
 * Dashhboard routes
 */
const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const dashboardController = require("../controllers/dashboard.controller");

// Protect dashboard
router.get("/", authMiddleware, dashboardController.getDashboard);

module.exports = router;
