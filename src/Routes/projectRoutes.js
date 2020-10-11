const express = require("express");
const router = express.Router();

const projectController = require("../Controllers/projectController");

// get all projects overview (name, video )
router.get("/", projectController.getAllProjects);

// create new project
router.post("/", projectController.createProject);

// get project by specific id
router.get("/:id", projectController.getProjectById);

// update project information
router.put("/:id", projectController.updateProjectById);

// delete project
router.delete("/:id", projectController.deleteProjectById);

module.exports = router;
