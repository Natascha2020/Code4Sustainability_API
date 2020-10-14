const express = require("express");
const router = express.Router();

const userController = require("../Controllers/userController");
const projectController = require("../Controllers/projectController");
const developerController = require("../Controllers/developerController");

// get all users
router.get("/", userController.getAllUsers);

// create new user (and depending on typeOfUser a project or developer)
router.post("/", projectController.createProject, developerController.createDeveloper,  userController.createUser);

// delete user (in user collection and project or developer collection depending on typeOfUser)
router.delete("/:email", userController.deleteUserByEmail, projectController.deleteProjectByEmail, developerController.deleteDeveloperByEmail);

// get user by specific id
router.get("/:id", userController.getUserById);

// update user information
router.put("/:id", userController.updateUserById);



module.exports = router;
