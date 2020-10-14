const express = require("express");
const router = express.Router();

const projectController = require("../Controllers/projectController");


// get all projects
router.get("/", projectController.getAllProjects);

module.exports = router;
