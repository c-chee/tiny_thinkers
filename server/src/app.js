/**
 * Notes:
 * - JSON parsing
 * - CORS
 * - Routes
 */
const express = require("express");
const cors = require("cors");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

const db = require("./db");
const userRoutes = require("./routes/user.routes");

const dashboardRoutes = require("./routes/dashboard.routes");
const contentRoutes = require("./routes/content.routes");

app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Allows server to read JSON req

// === HANDLEBARS ===
// Static files: client/public -> /css, /js, /images, etc.
app.use(express.static(path.join(__dirname, "../../client/public")));

// Handlebars templating setup
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../../client/views/layouts"),
    partialsDir: path.join(__dirname, "../../client/views/partials"),
    helpers: {
      isSelected: (current, value) => {
        return current === value ? "selected" : "";
      },
    },
  }),

  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../../client/views/layouts"),
    partialsDir: path.join(__dirname, "../../client/views/partials"),
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));

// === PAGE ROUTES ===
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Tiny Thinkers | Home" });
});

app.get("/spelling", (req, res) => {
  res.render("spelling", {
    pageTitle: "Tiny Thinkers | Spelling",
    pageCss: "/css/spelling.css",
  });
});

// reading comprehension 
const readingRoutes = require('./routes/reading.routes');
app.use('/', readingRoutes);

// const pageRoutes = require('./routes/pages.routes');
// app.use('/', pageRoutes);

// === API ROUTES ===
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// === LOGIN ===
app.get("/login", (req, res) => {
  res.render("Login", {
    pageTitle: "Tiny Thinkers | Login",
    layout: "loginlayout",
  });
});

// === VOLUNTEER ===
app.get("/volunteer", (req, res) => {
  res.render("volunteer", {
    layout: "volunteerlayout",
    title: "Volunteer",
  });
});

// === DATABASE ===
// User route connection
app.use("/api/users", userRoutes);

// DB connection test route
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ db: "connected", result: rows[0].result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }

// === DASHBOARD ===
app.use("/dashboard", dashboardRoutes);

// === CONTENT ===
app.use("/content", contentRoutes);

// === Resources ===
app.get('/resources', (req, res) => {
    res.render('resources', {
      layout: 'resourceslayout',
      title: 'Resources'
    });
})

// === 404 HANDLER === 
// *** Must be last ***
app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "tiny thinkers | not found",
  });
});

module.exports = app;
