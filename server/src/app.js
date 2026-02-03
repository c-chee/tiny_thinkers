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
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const app = express();

const db = require("./db");

const userRoutes = require("./routes/user.routes");
const readingRoutes = require("./routes/reading.routes");
const dictionaryRoutes = require("./routes/dictionary.routes");
const spellingRoutes = require("./routes/spelling.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const contentRoutes = require("./routes/content.routes");
const settingsRoutes = require("./routes/settings.routes");

const authMiddleware = require("./middleware/auth.middleware");

// === MIDDLEWARE ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

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

// ===================================================
// PAGE ROUTES
// ===================================================

// Public Route
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Tiny Thinkers | Home",
    homeLink: "/",
  });
});

// Protected pages that are rendered directly here
app.get("/cards", authMiddleware, (req, res) => {
  res.render("cards", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Cards",
    pageCss: "/css/cards.css",
    homeLink: "/dashboard",
  });
});

app.get("/spelling", authMiddleware, (req, res) => {
  res.render("spelling", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Spelling",
    pageCss: "/css/spelling.css",
    homeLink: "/dashboard",
  });
});

// === LOGIN ===
app.get("/login", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect("/dashboard");
    } catch {
      // invalid token -> show login
    }
  }

  res.render("Login", {
    pageTitle: "Tiny Thinkers | Login",
    layout: "loginlayout",
  });
});

// === SETTINGS PAGE ===
app.get("/settings", authMiddleware, (req, res) => {
  res.render("settings", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Settings",
    pageCss: "/css/settings.css",
    homeLink: "/dashboard",
    pageScript: "/js/settings.js",
  });
});

// === RESOURCES ===
app.get("/resources", authMiddleware, (req, res) => {
  res.render("resources", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Resources",
    pageCss: "/css/resources.css",
    homeLink: "/dashboard",
    pageScript: "/js/resources.js",
  });
});

// === VOLUNTEER ===
app.get("/volunteer", authMiddleware, (req, res) => {
  res.render("volunteer", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Volunteer",
    pageCss: "/css/volunteer.css",
    homeLink: "/dashboard",
    pageScript: "/js/volunteer.js",
  });
});

// ===================================================
// FEATURE ROUTES
// ===================================================

// Dashboard pages
app.use("/dashboard", dashboardRoutes);

// Content pages
app.use("/content", contentRoutes);

// Reading routes
app.use("/", readingRoutes);

// ===================================================
// API ROUTES
// ===================================================

// Users
app.use("/api/users", userRoutes);

// Settings
app.use("/api/settings", settingsRoutes);

// Dictionary + spelling APIs
app.use("/api", dictionaryRoutes);
app.use("/api", spellingRoutes);

// API status
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// ===================================================
// DB TEST
// ===================================================
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ db: "connected", result: rows[0].result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});

// ===================================================
// ERROR HANDLER (500)
// ===================================================
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).render("error", {
    pageTitle: "Tiny Thinkers | Something Went Wrong",
    code: err.status || 500,
    message: "oops… tiny tripped up. try again in a moment!",
    imageSrc: "/images/tiny_confused.PNG",
    imageAlt: "tiny looking confused",
    pageCss: "/css/error.css",
  });
});

// ===================================================
// 404 HANDLER (must be last)
// ===================================================
app.use((req, res) => {
  res.status(404).render("error", {
    pageTitle: "Tiny Thinkers | Not Found",
    code: 404,
    message: "tiny can’t find this page... but that’s okay!",
    imageSrc: "/images/tiny8.PNG",
    imageAlt: "tiny searching",
    pageCss: "/css/error.css",
  });
});

module.exports = app;
