/**
 * Dashhboard routes
 */
const express = require("express");
const router = express.Router();
const dashboardController = require("../controllers/dashboard.controller");


// router.get(
//     '/',
//     authMiddleware,
//     dashboardController.getDashboard
// );


router.get("/", dashboardController.getDashboard);

module.exports = router;
