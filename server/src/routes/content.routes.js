const express = require("express");
const router = express.Router();
const contentController = require("../controllers/content.controller");

router.get("/:type", contentController.getContentPage);

module.exports = router;
