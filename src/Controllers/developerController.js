// import specific model for database
const Developer = require("../Models/Developer");
const User = require("../Models/User");
const Project = require("../Models/Project");
const paramsCheck = require("../Helpers/paramsCheck");

const developerController = {
  // get all developers
  getAllDevelopers: async (req, res) => {
    try {
      const result = await Developer.find({});
      res.json(result);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  },

  createDeveloper: async (req, res, next) => {
    const { email, password, typeOfUser } = req.body;
    console.log(email, password, typeOfUser);

    const validParams = paramsCheck([email, password, typeOfUser]);
    /* if (!validParams) {
      res.sendStatus(400).send("Please insert valid data");
      console.log("Error: invalid data on client request");
      return;
    } */
    //check if user is a developer, then create developer
    try {
      if (typeOfUser === "Developer") {
        await Developer.create({ email: email });
      }
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  addProject: async (req, res, next) => {
    //developer gives interest to project, this will update pending list in matches for developer and project
    //iduser(developer)
    const id = req.user.idUser;
    //iduser(project)
    const { user_id_p } = req.query;
    //projects/:id/addProject?id=user_id(project)

    try {
      const findDeveloper = await User.findOne({ _id: id });
      const findProject = await User.findOne({ _id: user_id_p });

      // check if iduser(project) already exists in projects_pending-array, if not then push to it
      const result = await Developer.exists({ _id: findDeveloper.id_developer, projects_pending: user_id_p });

      if (!result) {
        const pushedProject = await Developer.findByIdAndUpdate(findDeveloper.id_developer, { $push: { projects_pending: user_id_p } });

        const pushedDeveloper = await Project.findByIdAndUpdate(findProject.id_project, { $push: { developers_pending: id } });
        res.json({ pushedDeveloper: pushedDeveloper, pushedProject: pushedProject });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  acceptProject: async (req, res) => {
    // delete userid(project)from pending_projects-array and push it to projects_matched-array on userid
    //iduser(project)
    const id = req.user.idUser;
    //iduser(projects)
    const { user_id_p } = req.query;
    //developers/:id/addProject?id=user_id(project)

    try {
      const developerPending = await User.findOne({ _id: id });
      const projectPending = await User.findOne({ _id: user_id_p });

      // check if iduser(project) already exists in projects_pending-array, if not then push to it
      const result = await Developer.exists({ _id: developerPending.id_developer, projects_pending: user_id_p });

      if (result) {
        //add to matched-array for project and developer by their userid
        const pushedProject = await Developer.findOneAndUpdate({ _id: developerPending.id_developer }, { $push: { projects_matched: user_id_p } });
        const pushedDeveloper = await Project.findOneAndUpdate({ _id: projectPending.id_project }, { $push: { developers_matched: id } });
        //remove from pending-array for project and developer by their userid
        const removedProject = await Developer.findOneAndUpdate({ _id: developerPending.id_developer }, { $pull: { projects_pending: user_id_p } });
        const removedDeveloper = await Project.findOneAndUpdate({ _id: projectPending.id_project }, { $pull: { developers_pending: id } });

        res.json({
          pushedDeveloper: pushedDeveloper,
          pushedProject: pushedProject,
          removedDeveloper: removedDeveloper,
          removedProject: removedProject,
        });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  deletePendingProject: async (req, res) => {
    const id = req.user.idUser;
    const { user_id_p } = req.query;

    try {
      const findDeveloper = await User.findOne({ _id: id });
      const findProject = await User.findOne({ _id: user_id_p });

      // check if iduser(project) already exists in projects_pending-array, if so delete it prom developer and project
      const result = await Developer.exists({ _id: findDeveloper.id_developer, projects_pending: user_id_p });

      if (result) {
        const pushedProject = await Developer.findOneAndUpdate({ _id: findDeveloper.id_developer }, { $pull: { projects_pending: user_id_p } });
        const pushedDeveloper = await Project.findOneAndUpdate({ _id: findProject.id_project }, { $pull: { developers_pending: id } });
        res.json({ pushedDeveloper: pushedDeveloper, pushedProject: pushedProject });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  deleteMatchedProject: async (req, res) => {
    // delete userid(project)from pending_project-array and push it to project_matched-array on userid
    const id = req.user.idUser;
    const { user_id_p } = req.query;

    console.log(id);

    try {
      const developerPending = await User.findOne({ _id: id });
      console.log("Test", developerPending);
      const projectPending = await User.findOne({ _id: user_id_p });

      console.log("Test2", projectPending);

      const result = await Developer.exists({ _id: developerPending.id_developer, projects_matched: user_id_p });

      console.log("result", result);
      if (result) {
        const removedProject = await Developer.findOneAndUpdate({ _id: developerPending.id_developer }, { $pull: { projects_matched: user_id_p } });
        const removedDeveloper = await Project.findOneAndUpdate({ _id: projectPending.id_project }, { $pull: { developers_matched: id } });

        res.json({
          removedDeveloper: removedDeveloper,
          removedProject: removedProject,
        });
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
};

module.exports = developerController;
