

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
<<<<<<< HEAD
=======

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

>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
  "hbs",
  engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "../../client/views/layouts"),
    partialsDir: path.join(__dirname, "../../client/views/partials"),
  }),
<<<<<<< HEAD
=======

>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../../client/views"));

// === PAGE ROUTES ===
app.get("/", (req, res) => {
  res.render("home", { pageTitle: "Tiny Thinkers | Home" });
});

<<<<<<< HEAD
app.get("/cards", (req, res) => {
  res.render("cards", {
    pageTitle: "Tiny Thinkers | Cards",
    pageCss: "/css/cards.css",
  });
=======
app.get("/spelling", (req, res) => {
  res.render("spelling", {
    pageTitle: "Tiny Thinkers | Spelling",
    pageCss: "/css/spelling.css",
  });
});

// === API ROUTES ===
app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
});


app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
<<<<<<< HEAD
=======
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
>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
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

// === LOGIN === 
=======
 
module.exports = app;
//login 

// === LOGIN === 

>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
app.get("/Login", (req, res) => {
  res.render("Login", { pageTitle : "Login",
    layout: "loginlayout"
  });
});

<<<<<<< HEAD
=======

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


>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
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
    pageTitle: "tiny thinkers | not found"
  });
});

<<<<<<< HEAD
module.exports = app;
=======


module.exports = app;

>>>>>>> c65f7f861e2e8ac8b99f00b1e261e5656e6dc1d0
