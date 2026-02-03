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

const db = require("./db");

const userRoutes = require("./routes/user.routes");
const readingRoutes = require("./routes/reading.routes");
const dictionaryRoutes = require("./routes/dictionary.routes");
const spellingRoutes = require("./routes/spelling.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const contentRoutes = require("./routes/content.routes");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Allows server to read JSON req
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
app.use('/', readingRoutes);

// === SETTINGS ===
app.get("/settings", (req, res) => {
  res.render("settings", {
    pageTitle: "Tiny Thinkers | Settings",
    pageCss: "/css/settings.css",
  });
});

// === LOGIN ===
app.get("/login", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect("/dashboard");
    } catch (err) {
      // invalid/expired token -> fall through to render login
    }
  }

  res.render("Login", {
    pageTitle: "Tiny Thinkers | Login",
    layout: "loginlayout"
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

// === API ROUTES (SIMPLE) ===
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// === FEATURE ROUTES ===
app.use("/api/users", userRoutes);

// If reading.routes defines paths like "/reading", "/quiz", etc., mounting at "/" is fine.
app.use("/", readingRoutes);

app.use("/dashboard", dashboardRoutes);
app.use("/content", contentRoutes);

// Dictionary + spelling endpoints
app.use("/api", dictionaryRoutes);
app.use("/api", spellingRoutes);

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

// === ERROR HANDLER (500) ===
// *** Should be near the end , but BEFORE the 404 handler ***
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

// === 404 HANDLER ===
// *** Must be last ***
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
