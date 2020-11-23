// import specific model for database
const User = require("../Models/User");
const Project = require("../Models/Project");
const Developer = require("../Models/Developer");
const jwt = require("jsonwebtoken");

const paramsCheck = require("../Helpers/paramsCheck");

//Import bcyrpt for hashing password
const bcrypt = require("bcrypt");

const userController = {
  /*   getAllUsers: async (req, res) => {
    try {
      const result = await User.find({});
      res.json(result);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  }, */

  getAllUsersProjects: async (req, res) => {
    try {
      let idUser;
      try {
        const payload = await jwt.verify(req.cookies.accessToken, "cat");
        idUser = payload.idUser;
      } catch (e) {
        console.log("not a connected user");
      }
      let result = await User.find({ typeOfUser: "Project" }).populate({ path: "id_project" }).lean();
      result = result.map((el) => {
        if (el.id_project.developers_pending.includes(idUser) || el.id_project.developers_matched.includes(idUser)) {
          el.sentInterest = true;
        }
        return el;
      });
      res.json(result);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  },

  getAllUsersDevelopers: async (req, res) => {
    try {
      const result = await User.find({ typeOfUser: "Developer" });
      res.json(result);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  },

  createUser: async (req, res) => {
    const { email, password, typeOfUser } = req.body;
    // params check already done
    // salting users plain text password through hashing function to save as hash in database
    // sending back to client projectname and id
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);

      // checking if project or developer profile was created and assigning reference-id accordingly

      let project = await Project.findOne({ email: email });
      project ? (project = project._id) : "null";

      let developer = await Developer.findOne({ email: email });
      developer ? (developer = developer._id) : "null";

      const newUser = await User.create({ email: email, password: hash, typeOfUser: typeOfUser, id_developer: developer, id_project: project });
      res.json({ email: email, id: newUser._id, typeOfUser: typeOfUser });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  // delete user profile and go next to delete developer or project profile accordingly
  deleteUserById: async (req, res) => {
    const id = req.user.idUser;

    if (!paramsCheck([id])) {
      res.sendStatus(400);
      console.log("Error: invalid data on client request");
      return;
    }

    try {
      const user = await User.find({ _id: id });

      if (user.typeOfUser && user.typeOfUser === "Project") {
        await Project.findOneAndDelete({ _id: user.project_id });
      }

      if (user.typeOfUser && user.typeOfUser === "Developer") {
        await Developer.findOneAndDelete({ _id: user.developer_id });
      }

      await User.findAndDelete({ _id: id });
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  // find specific user by email
  getUserById: async (req, res) => {
    /* console.log(req.user.idUser);
    const id = req.user.idUser; */

    /*  */
    console.log("A", req.query.currentUser);
    console.log("B", req.params.id);

    try {
      const id = req.query.currentUser ? req.user.idUser : req.params.id;

      let result = await User.findOne({ _id: id }, { password: 0 });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  // update user information according to given changes on client request, sending back updated data to client
  updateUserById: async (req, res) => {
    const { email, name, password, webpage, image, location, question1, question2, question3, answer1, answer2, answer3 } = req.body;
    const id = req.user.idUser;
    let newHash = "";

    try {
      if (password && password.length) {
        const saltRounds = 10;
        newHash = await bcrypt.hash(password, saltRounds);
      }

      // check validity of every single parameter and delete it from object used to update data
      const updatedValue = {
        email: email,
        name: name,
        password: newHash,
        webpage: webpage,
        image: image,
        location: location,
        question1: question1,
        question2: question2,
        question3: question3,
        answer1: answer1,
        answer2: answer2,
        answer3: answer3,
      };

      if (!email || email === "") delete updatedValue.email;
      if (!name || name === "") delete updatedValue.name;
      if (!password || password === "") delete updatedValue.password;
      if (!webpage || webpage === "") delete updatedValue.webpage;
      if (!image || image === "") delete updatedValue.image;
      if (!location || location === "") delete updatedValue.location;
      if (!question1 || question1 === "") delete updatedValue.question1;
      if (!question2 || question2 === "") delete updatedValue.question2;
      if (!question3 || question3 === "") delete updatedValue.question3;
      if (!answer1 || answer1 === "") delete updatedValue.answer1;
      if (!answer2 || answer2 === "") delete updatedValue.answer2;
      if (!answer3 || answer3 === "") delete updatedValue.answer3;

      const result = await User.findOneAndUpdate({ _id: id }, { $set: updatedValue }, { password: 0 });
      res.json(result);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  // get dashboard depending on typeOfUser by specific id
  getDashboard: async (req, res) => {
    const id = req.user.idUser;

    if (!paramsCheck([id])) {
      res.sendStatus(400);
      console.log("Error: invalid data on client request");
      return;
    }

    try {
      const result = await User.findOne({ _id: id });

      // check if user is a project owner and send developer lists as response
      if (result.typeOfUser === "Project") {
        let project = await Project.findOne({ _id: result.id_project });
        res.json({ developers_pending: project.developers_pending, developers_matched: project.developers_matched, email: project.email });
      }
      // check if user is a developer and send project lists as response
      if (result.typeOfUser === "Developer") {
        let developer = await Developer.findOne({ _id: result.id_developer });
        res.json({ projects_pending: developer.projects_pending, projects_matched: developer.projects_matched, email: developer.email });
      }
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  },
};

module.exports = userController;
