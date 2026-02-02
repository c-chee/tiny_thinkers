/**
 * Dashhboard routes
 */
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard.controller');
const authMiddleware = require('../middleware/auth.middleware');

// Protected dashboard
router.get('/', authMiddleware, dashboardController.getDashboard);

module.exports = router;

