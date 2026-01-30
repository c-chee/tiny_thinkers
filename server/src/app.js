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
  }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));

// === PAGE ROUTES ===
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Tiny Thinkers | Home" });
<<<<<<< HEAD
});

app.get("/cards", (req, res) => {
  res.render("cards", {
    pageTitle: "Tiny Thinkers | Cards",
    pageCss: "/css/cards.css",
  });
=======
>>>>>>> origin/main
});

app.get("/spelling", (req, res) => {
  res.render("spelling", {
    pageTitle: "Tiny Thinkers | Spelling",
    pageCss: "/css/spelling.css",
  });
});

// === API ROUTES ===
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
<<<<<<< HEAD
=======
});


app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// === LOGIN === 
app.get("/login", (req, res) => {
  res.render("Login", { pageTitle : "Tiny Thinkers | Login",
    layout: "loginlayout"
  });
});

// === VOLUNTEER ===
app.get("/volunteer", (req, res) => {
  res.render("volunteer", {
    layout: "volunteerlayout",
    title: "Volunteer",
  });
>>>>>>> origin/main
});

// === DATABASE ===
// User route connection
app.use("/api/users", userRoutes);

// DB connection test route
app.get("/db-test", async (req, res) => {
  const [rows] = await db.query("SELECT 1");
  res.json({ db: "connected" });
});

<<<<<<< HEAD
// 404 handler
=======
// === 404 HANDLER === 
// *** Must be last ***
>>>>>>> origin/main
app.use((req, res) => {
  res.status(404).render("404", {
    pageTitle: "tiny thinkers | not found",
  });
});

module.exports = app;
