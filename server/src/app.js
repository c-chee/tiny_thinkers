/**
 * Notes:
 * - JSON parsing
 * - CORS
 * - Routes
 */
const express = require('express');

const app = express();

// Allows server to read JSON
app.use(express.json());

// Temp test route
app.get('/hello', (req, res) => {
    res.json({ status: 'ok' });
});

module.exports = app;
