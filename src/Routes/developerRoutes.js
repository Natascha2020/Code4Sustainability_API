const express = require("express");
const router = express.Router();

const developerController = require("../Controllers/developerController");

// get all developers
router.get("/", developerController.getAllDevelopers);

// add project on userid where userid(idproject) to pending matches in developer and project
router.put("/:id/addProject", developerController.addProject);

// add project on userid where userid(idporject) to accepted matches in developer and project
router.put("/:id/acceptProject", developerController.acceptProject);

module.exports = router;
