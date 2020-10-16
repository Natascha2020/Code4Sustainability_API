const express = require("express");
const router = express.Router();

const projectController = require("../Controllers/projectController");


// get all projects
router.get("/", projectController.getAllProjects);

router.put("/:id/addDeveloper", projectController.addDeveloper)

module.exports = router;
