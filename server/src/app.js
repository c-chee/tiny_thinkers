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
app.use(express.static(path.join(__dirname, "../../client/public")));

// Handlebars templaing setup
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

app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Tiny Thinkers | Home" });
});

app.get("/cards", (req, res) => {
  res.render("cards", {
    pageTitle: "Tiny Thinkers | Cards",
    pageCss: "/css/cards.css",
  });
});


app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

// === DATABASE ===
// User route connection
app.use("/api/users", userRoutes);

// DB connection test route
app.get("/db-test", async (req, res) => {
  const [rows] = await db.query("SELECT 1");
  res.json({ db: "connected" });
});

// === LOGIN === 
app.get("/Login", (req, res) => {
  res.render("Login", { pageTitle : "Login",
    layout: "loginlayout"
  });
});

// === VOLUNTEER ===
app.get('/volunteer', (req, res) => {
    res.render('volunteer', {
      layout: 'volunteerlayout',
      title: 'Volunteer'
    });
});
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
