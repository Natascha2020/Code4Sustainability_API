const express = require("express");
const router = express.Router();

const developerController = require("../Controllers/developerController");
const verifyAuth = require("../Authentication/verifyAuth");

// get all developers
router.get("/", developerController.getAllDevelopers);

// add project on userid where userid(idproject) to pending matches in developer and project
router.put("/addProject", verifyAuth, developerController.addProject);

router.put("/deletePendingProject", verifyAuth, developerController.deletePendingProject);

// add project on userid where userid(idporject) to accepted matches in developer and project
router.put("/acceptProject", verifyAuth, developerController.acceptProject);

router.put("/deleteMatchedProject", verifyAuth, developerController.deleteMatchedProject);

module.exports = router;
