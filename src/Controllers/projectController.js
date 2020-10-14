// import specific model for database
const Project = require("../Models/Project");
const paramsCheck = require("../Helpers/paramsCheck");

const projectController = {

  // get all projects
  getAllProjects: (req, res) => {
    Project.find({}, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        return;
      }
      console.log(data);
      res.json(data);
    });
  },

  createProject: async (req, res, next) => {
    const { email, password, typeOfUser } = req.body;
    console.log(email, password);

    const validParams = paramsCheck([email, password, typeOfUser]);
    if (!validParams) {
      res.sendStatus(400).send("Please insert valid data");
      console.log("Error: invalid data on client request");
      return;
    }
    //check if user is a project owner, then create project, else go next (create developer)
    try {
      if(typeOfUser === "Project"){
      const project = await Project.create({email: email });
    }
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  },

  // if user is a project owner, delete project not only in user, but in project collection as well
  deleteProjectByEmail: async (req, res, next) => {
    const {email} = req.params;
    await Project.findOneAndDelete({email: email}, (err, data) => {
      if(err) {
        res.senStatus(500);
        console.error(err)
        return}
      if(data === null) next()
      else{
      res.send("Project successfully deleted!");
      console.log("Project successfully deleted!");
      }}) 
}}

module.exports = projectController;
