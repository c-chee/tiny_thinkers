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

// Optional / newer routes (only keep if these files exist in your repo)
const dashboardRoutes = require("./routes/dashboard.routes");
const contentRoutes = require("./routes/content.routes");
const readingRoutes = require("./routes/reading.routes");
const dictionaryRoutes = require("./routes/dictionary.routes");

app.use(cors());
app.use(express.json());

// === STATIC FILES ===
app.use(express.static(path.join(__dirname, "../../client/public")));

// === HANDLEBARS ===
app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../../client/views/layouts"),
    partialsDir: path.join(__dirname, "../../client/views/partials"),
    helpers: {
      isSelected: (current, value) => (current === value ? "selected" : ""),
    },
  }),
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));

// === PAGE ROUTES ===
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Tiny Thinkers | Home" });
});

app.get("/cards", (req, res) => {
  res.render("cards", {
    pageTitle: "Tiny Thinkers | Cards",
    pageCss: "/css/cards.css",
  });
});

app.get("/spelling", (req, res) => {
  res.render("spelling", {
    pageTitle: "Tiny Thinkers | Spelling",
    pageCss: "/css/spelling.css",
  });
});

// === READING COMPREHENSION ===
// reading comprehension 
const readingRoutes = require('./routes/reading.routes');
app.use('/', readingRoutes);

// === SETTINGS ===
app.get("/settings", (req, res) => {
  res.render("settings", { 
    pageTitle: "Tiny Thinkers | Settings",
    pageCss: "/css/settings.css"  
  });
});

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

app.get("/volunteer", (req, res) => {
  res.render("volunteer", {
    layout: "volunteerlayout",
    title: "Volunteer",
  });
});

app.get("/resources", (req, res) => {
  res.render("resources", {
    layout: "resourceslayout",
    title: "Resources",
  });
});

// === API ROUTES ===
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// === FEATURE ROUTES ===
app.use("/api/users", userRoutes);
app.use("/", readingRoutes); // reading comprehension routes
app.use("/dashboard", dashboardRoutes);
app.use("/content", contentRoutes);
app.use("/api", dictionaryRoutes);

// DB connection test route
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ db: "connected", result: rows[0].result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

// === USERS ===
app.use("/api/users", userRoutes);


// === DASHBOARD ===
app.use("/dashboard", dashboardRoutes);

// === CONTENT ===
app.use("/content", contentRoutes);

// === RESOURCES ===
app.get('/resources', (req, res) => {
  res.render('resources', {
    layout: 'resourceslayout',
    title: 'Resources'
  });
});

// === VOLUNTEER ===
app.get('/volunteer', (req, res) => {
    res.render('volunteer', {
      layout: 'volunteerlayout',
      title: 'Volunteer'
    });
});

// === 404 HANDLER === 
// *** Must be last ***
app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "tiny thinkers | not found",
  });
});

module.exports = app;
