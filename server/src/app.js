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
const readingRoutes = require("./routes/reading.routes");
const dictionaryRoutes = require("./routes/dictionary.routes");
const spellingRoutes = require("./routes/spelling.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const contentRoutes = require("./routes/content.routes");
const settingsRoutes = require("./routes/settings.routes");

const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cors()); // Enables cross-origin requests
app.use(express.json()); // Allows server to read JSON req
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
      isSelected: (current, value) =>
        current === value ? "selected" : "",
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));


// === PAGE ROUTES ===
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Tiny Thinkers | Home",
    homeLink: "/",
  });
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


// === LOGIN ===
app.get("/login", (req, res) => {
  const token = req.cookies?.token;

  if (token) {
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return res.redirect("/dashboard");
    } catch {}
  }

  res.render("Login", {
    pageTitle: "Tiny Thinkers | Login",
    layout: "loginlayout",
  });
});


// === SETTINGS ===
app.use("/api/settings", settingsRoutes);

app.get("/settings", (req, res) => {
  res.render("settings", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Settings",
    pageCss: "/css/settings.css",
    homeLink: "/dashboard",
  });
});


// === READING COMPREHENSION ===
// Placed after fixed routes so it doesn't swallow them
app.use("/", readingRoutes);


// === DASHBOARD ===
app.use("/dashboard", dashboardRoutes);


// === CONTENT ===
app.use("/content", contentRoutes);


// === USERS ===
app.use("/api/users", userRoutes);


// === DICTIONARY + SPELLING APIs ===
app.use("/api", dictionaryRoutes);
app.use("/api", spellingRoutes);


// === RESOURCES ===
app.get("/resources", (req, res) => {
  res.render("resources", {
    layout: "resourceslayout",
    title: "Resources",
  });
});


// === VOLUNTEER ===
app.get("/volunteer", (req, res) => {
  res.render("volunteer", {
    layout: "volunteerlayout",
    title: "Volunteer",
  });
});


// === API ROUTES ===
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});


// === DB ===
// connection test route
app.get("/db-test", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ db: "connected", result: rows[0].result });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "DB connection failed" });
  }
});


// === 404 HANDLER ===
// *** Must be last ***
app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "tiny thinkers | not found",
  });
});

module.exports = app;
