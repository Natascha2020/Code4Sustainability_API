// import specific model for database
const Project = require("../Models/Project");
const paramsCheck = require("../Helpers/paramsCheck");

//Import bcyrpt for hashing password
const bcrypt = require("bcrypt");

const projectController = {
  getAllProjects: (req, res) => {
    console.log("Test1");
    Project.find({}, (err, data) => {
      console.log("Test2");
      if (err) {
        res.sendStatus(500);
        console.log(err);
        return;
      }
      console.log(data);
      console.log("Test3");
      res.json(data);
    });
  },

  createProject: async (req, res, next) => {
    console.log("testA");
    const { projectname, password } = req.body;
    console.log(projectname, password);

    const validParams = paramsCheck([projectname, password]);
    if (!validParams) {
      res.sendStatus(400).send("Please insert valid data for parameters");
      console.log("errormessage");
      return;
    }

    // salting users plain text password through hashing function to save as hash in database
    // sending back to client username and id
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      console.log(hash);
      console.log("test B");
      const project = await Project.create({ projectname: projectname, password: hash });
      console.log(project);
      console.log("test C");
      res.json({ projectname: project.projectname, id: project._id });
      console.log("test D");
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
      return;
    }
  },

  getProjectById: (req, res, next) => {},

  updateProjectById: (req, res, next) => {},

  deleteProjectById: (req, res) => {},
};

module.exports = projectController;
