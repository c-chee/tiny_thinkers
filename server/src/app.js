/**
 * Notes:
 * - JSON parsing
 * - CORS
 * - Routes
 */
const express = require('express');
const db = require("./db");

const app = express();

// Allows server to read JSON
app.use(express.json());

// User route connection
const userRoutes = require("./routes/user.routes");
app.use("/api/users", userRoutes);

// DB connection test route
app.get("/db-test", async (req, res) => {
    const [rows] = await db.query("SELECT 1");
    res.json({ db: "connected" });
});


module.exports = app;
