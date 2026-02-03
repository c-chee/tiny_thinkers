/**
 * This file connects routes to controllers
 */
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Signup
// POST /api/users/signup
router.post('/signup', userController.signup);

// Login
// POST /api/users/login
router.post('/login', userController.login);

// Logout
// POST /api/users/logout
router.post('/logout', (req, res) => {
    // Remove the JWT cookie
    res.clearCookie('token', { httpOnly: true, sameSite: 'lax' });
    res.json({ message: 'Logged out' });
});

module.exports = router;


