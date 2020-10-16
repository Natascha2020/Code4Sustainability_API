const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const developerController = require("../Controllers/developerController");

// get all users
router.get("/", userController.getAllUsers);

// get all users with tpeOfUser "Project"
router.get("/projects", userController.getAllUsersProjects);

// get all users with tpeOfUser "Developer"
router.get("/developers", userController.getAllUsersDevelopers);

// create new user (and depending on typeOfUser a project or developer)
router.post("/", projectController.createProject, developerController.createDeveloper, userController.createUser);

// delete user (in user collection and project or developer collection depending on typeOfUser)
router.delete("/:id", userController.deleteUserById);

// get user by specific id
router.get("/:id", userController.getUserById);

// get dashboard depending on typeOfUser by specific id
router.get("/getDashboard/:id", userController.getDashboard);

// update user information
router.put("/:id", userController.updateUserById);

module.exports = router;
