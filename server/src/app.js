

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
        helpers: {
          isSelected: (current, value) => {
            return current === value ? 'selected' : '';
          }
        }
    }),
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));

app.get("/", (req, res) => {
    res.render("home", { pageTitle: "Tiny Thinkers | Home" });
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

 
module.exports = app;
//login 
app.get("/Login", (req, res) => {
  res.render("Login", { pageTitle : "Login"});
});

// reading comprehension 
const readingRoutes = require('./routes/reading.routes');
app.use('/', readingRoutes);

// const pageRoutes = require('./routes/pages.routes');
// app.use('/', pageRoutes);


// === RESOURCE ===
// app.get('/resources', (req, res) => {
//   res.render('resources', {
//     layout: 'resourcelayout',
//     title: 'Resources',
//     categories: resourcesData.categories,
//   });
// });

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
    pageTitle: "tiny thinkers | not found"
  });
});




// const express = require('express');

// const userRoutes = require('./routes/user_routes');
// const learningRoutes = require('./routes/learning _routes');

// const app = express();

// app.use(express.json());



// app.use('/api/learning', learningRoutes);

// app.use('/api/users', userRoutes);

// app.use((req, res) => {
//     res.status(404).json({ error: 'Route not found'});
// });

// module.exports = app;