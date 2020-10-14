const express = require("express");
const router = express.Router();

const developerController = require("../Controllers/developerController");

// get all developers
router.get("/", developerController.getAllDevelopers);

module.exports = router;
