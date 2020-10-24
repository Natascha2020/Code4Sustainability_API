const express = require("express");
const router = express.Router();

const projectController = require("../Controllers/projectController");
const verifyAuth = require("../Authentication/verifyAuth");

// get all projects
router.get("/", projectController.getAllProjects);

// add developer on userid(project) where userid(developer) to pending matches
router.put("/addDeveloper", verifyAuth, projectController.addDeveloper);

router.put("/deletePendingDeveloper", verifyAuth, projectController.deletePendingDeveloper);

// add developer on userid(project) where userid(developer) to accepted matches
router.put("/acceptDeveloper", verifyAuth, projectController.acceptDeveloper);

router.put("/deleteMatchedDeveloper", verifyAuth, projectController.deleteMatchedDeveloper);

module.exports = router;
