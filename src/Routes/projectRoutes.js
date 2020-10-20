const express = require("express");
const router = express.Router();

const projectController = require("../Controllers/projectController");

// get all projects
router.get("/", projectController.getAllProjects);

// add developer on userid(project) where userid(developer) to pending matches
router.put("/:id/addDeveloper", projectController.addDeveloper);

router.put("/:id/deletePendingDeveloper", projectController.deletePendingDeveloper);

// add developer on userid(project) where userid(developer) to accepted matches
router.put("/:id/acceptDeveloper", projectController.acceptDeveloper);

router.put("/:id/deleteMatchedDeveloper", projectController.deleteMatchedDeveloper);

module.exports = router;
