const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const developerController = require("../Controllers/developerController");
const verifyAuth = require("../Authentication/verifyAuth");

// get all users
// router.get("/", userController.getAllUsers);

// create new user (and depending on typeOfUser a project or developer)
router.post("/", projectController.createProject, developerController.createDeveloper, userController.createUser);

// update user information
router.put("/", verifyAuth, userController.updateUserById);

// get dashboard depending on typeOfUser by specific id
router.get("/getDashboard", verifyAuth, userController.getDashboard);

// get all users with tpeOfUser "Project"
router.get("/projects", userController.getAllUsersProjects);

// get all users with tpeOfUser "Developer"
router.get("/developers", userController.getAllUsersDevelopers);

// get user by specific id
router.get("/:id?", verifyAuth, userController.getUserById);

// delete user (in user collection and project or developer collection depending on typeOfUser)
router.delete("/:id?", verifyAuth, userController.deleteUserById);

// video upload
//router.post("/videoUpload", verifyAuth, userController.videoUpload);

module.exports = router;
