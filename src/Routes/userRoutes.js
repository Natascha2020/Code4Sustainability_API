const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const developerController = require("../Controllers/developerController");
const verifyAuth = require("../Authentication/verifyAuth");

// get all users
// router.get("/", userController.getAllUsers);

// get user by specific id
router.get("/", verifyAuth, userController.getUserById);

// create new user (and depending on typeOfUser a project or developer)
router.post("/", projectController.createProject, developerController.createDeveloper, userController.createUser);

// delete user (in user collection and project or developer collection depending on typeOfUser)
router.delete("/", verifyAuth, userController.deleteUserById);

// update user information
router.put("/", verifyAuth, userController.updateUserById);

// get dashboard depending on typeOfUser by specific id
router.get("/getDashboard", verifyAuth, userController.getDashboard);

// get all users with tpeOfUser "Project"
router.get("/projects", userController.getAllUsersProjects);

// get all users with tpeOfUser "Developer"
router.get("/developers", userController.getAllUsersDevelopers);

// video upload
router.post("/videoUpload", verifyAuth, userController.videoUpload);

// video stream
router.get("/Videos/:id?", verifyAuth, userController.videoStream);

module.exports = router;
