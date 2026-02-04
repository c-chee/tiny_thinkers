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
const contentMap = require("./config/contentMap");

// === MIDDLEWARE ===
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// === STATIC FILES ===
app.use(express.static(path.join(__dirname, "../../client/public")));

// === HANDLEBARS ===
const hbs = require("hbs");

hbs.registerHelper("eq", (a, b) => a === b);
hbs.registerHelper("contains", (csv, val) => {
    if (!csv) return false;
    return csv.split(",").includes(val);
});

app.engine(
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../../client/views/layouts"),
    partialsDir: path.join(__dirname, "../../client/views/partials"),
    helpers: {
      isSelected: (current, value) => (current === value ? "selected" : ""),
      eq: (a, b) => a === b,
      contains: (csv, val) => csv && csv.split(",").includes(val),
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));

// ===================================================
// PUBLIC PAGES
// ===================================================
app.get("/", (req, res) => {
  res.render("home", {
    pageTitle: "Tiny Thinkers | Home",
    homeLink: "/",
  });
});

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

// ===================================================
// DASHBOARD & CONTENT PAGES
// ===================================================
app.use("/dashboard", dashboardRoutes);
app.use("/content", contentRoutes);
app.use("/", readingRoutes);

// Cards & Spelling (example)
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

// Resources & Volunteer
app.get("/resources", authMiddleware, (req, res) => {
  res.render("resources", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Resources",
    pageCss: "/css/resources.css",
    homeLink: "/dashboard",
    pageScript: "/js/resources.js",
  });
});

app.get("/volunteer", authMiddleware, (req, res) => {
  res.render("volunteer", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Volunteer",
    pageCss: "/css/volunteer.css",
    homeLink: "/dashboard",
    pageScript: "/js/volunteer.js",
  });
});

app.get("/dictionary", authMiddleware, (req, res) => {
  res.render("dictionary", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Dictionary",
    pageCss: "/css/dictionary.css",
    pageScript: "/js/dictionary.js",
    homeLink: "/dashboard",
  });
});

app.get("/reading", authMiddleware, (req, res) => {
  res.render("comp", {
    layout: "dashboard-layout",
    pageTitle: "Tiny Thinkers | Reading",
    pageCss: "/css/comp.css",
    homeLink: "/dashboard",
    pageScript: "/js/comp.js",
  });
});

// ===================================================
// API ROUTES
// ===================================================
app.use("/api/users", userRoutes);
app.use("/", readingRoutes); // reading comprehension routes
app.use("/dashboard", dashboardRoutes);
app.use("/content", contentRoutes);
app.use("/api", dictionaryRoutes);

// Settings
app.use("/api/settings", settingsRoutes);
app.use("/api", dictionaryRoutes);
app.use("/api", spellingRoutes);

// API status
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// Settings
const settingsController = require("./controllers/settings.controller");

// Settings page
app.get("/settings", authMiddleware, settingsController.getSettings);

// Save is handled via API
app.use("/api/settings", settingsRoutes);


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
// ERROR HANDLERS
// ===================================================
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).render("error", {
    pageTitle: "Tiny Thinkers | Something Went Wrong",
    code: err.status || 500,
    message: "Oops… tiny tripped up. Try again later.",
    imageSrc: "/images/tiny_confused.PNG",
    imageAlt: "tiny confused",
    pageCss: "/css/error.css",
  });
});

app.use((req, res) => {
  res.status(404).render("error", {
    pageTitle: "Tiny Thinkers | Not Found",
    code: 404,
    message: "Tiny can’t find this page, but that’s okay!",
    imageSrc: "/images/tiny8.PNG",
    imageAlt: "tiny searching",
    pageCss: "/css/error.css",
  });
});

module.exports = app;
