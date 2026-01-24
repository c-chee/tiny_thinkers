const express = require("express");
const cors = require("cors");
const path = require("path");
const { engine } = require("express-handlebars");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../../client/public")));

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

app.get("/api/status", (req, res) => {
  res.json({ status: "Tiny Thinkers API running" });
});

module.exports = app;
