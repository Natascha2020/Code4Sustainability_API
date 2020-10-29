// import specific model for database
const Project = require("../Models/Project");
const paramsCheck = require("../Helpers/paramsCheck");
const User = require("../Models/User");
const Developer = require("../Models/Developer");

const projectController = {
  // get all projects
  getAllProjects: async (req, res) => {
    try {
      const result = await Project.find({});

      res.json(result);
    } catch (err) {
      res.sendStatus(500);
      console.error(err);
    }
  },

  createProject: async (req, res, next) => {
    const { email, password, typeOfUser } = req.body;

    const validParams = paramsCheck([email, password, typeOfUser]);
    if (!validParams) {
      res.sendStatus(400).send("Please insert valid data");
      console.log("Error: invalid data on client request");
      return;
    }
    //check if user is a project owner, then create project, else go next (create developer)

    try {
      if (typeOfUser === "Project") {
        await Project.create({ email: email });
      }
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  },

  addDeveloper: async (req, res, next) => {
    //iduser(project)
    const id = req.user.idUser;
    //iduser(developer)
    const { user_id_d } = req.query;
    //projects/:id/addDeveloper?user_id_d=user_id(developer)

    try {
      const findProject = await User.findOne({ _id: id });
      const findDeveloper = await User.findOne({ _id: user_id_d });

      // check if iduser(developer) already exists in developers_pending-array, if not then push to it
      const result = await Project.exists({ _id: findProject.id_project, developers_pending: user_id_d });

      if (!result) {
        const pushedDeveloper = await Project.findOneAndUpdate({ _id: findProject.id_project }, { $push: { developers_pending: user_id_d } });
        const pushedProject = await Developer.findOneAndUpdate({ _id: findDeveloper.id_developer }, { $push: { projects_pending: id } });
        res.json({ pushedDeveloper: pushedDeveloper, pushedProject: pushedProject });
        console.log(pushedDeveloper, pushedProject);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  acceptDeveloper: async (req, res) => {
    // delete userid(developer)from pending_developer-array and push it to developers_matched-array on userid
    //iduser(project)
    const id = req.user.idUser;
    //iduser(developer)
    const { user_id_d } = req.query;

    try {
      const projectPending = await User.findOne({ _id: id });
      const developerPending = await User.findOne({ _id: user_id_d });

      // check if iduser(developer) already exists in developers_pending-array, if not then push to it
      const result = await Project.exists({ _id: projectPending.id_project, developers_pending: user_id_d });

      if (result) {
        const pushedDeveloper = await Project.findOneAndUpdate({ _id: projectPending.id_project }, { $push: { developers_matched: user_id_d } });
        const pushedProject = await Developer.findOneAndUpdate({ _id: developerPending.id_developer }, { $push: { projects_matched: id } });
        const removedDeveloper = await Project.findOneAndUpdate({ _id: projectPending.id_project }, { $pull: { developers_pending: user_id_d } });
        const removedProject = await Developer.findOneAndUpdate({ _id: developerPending.id_developer }, { $pull: { projects_pending: id } });

        res.json({
          pushedDeveloper: pushedDeveloper,
          pushedProject: pushedProject,
          removedDeveloper: removedDeveloper,
          removedProject: removedProject,
        });
        console.log(pushedDeveloper, pushedProject, removedDeveloper, removedProject);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  deletePendingDeveloper: async (req, res) => {
    const id = req.user.idUser;
    //iduser(developer)
    const { user_id_d } = req.query;

    try {
      const findProject = await User.findOne({ _id: id });
      const findDeveloper = await User.findOne({ _id: user_id_d });
      console.log(findProject);
      // check if iduser(developer) already exists in developers_pending-array, if so delete it prom developer and project
      const result = await Project.exists({ _id: findProject.id_project, developers_pending: user_id_d });
      console.log(result);

      if (result) {
        const pushedDeveloper = await Project.findOneAndUpdate({ _id: findProject.id_project }, { $pull: { developers_pending: user_id_d } });
        const pushedProject = await Developer.findOneAndUpdate({ _id: findDeveloper.id_developer }, { $pull: { projects_pending: id } });
        res.json({ pushedDeveloper: pushedDeveloper, pushedProject: pushedProject });
        console.log(pushedDeveloper, pushedProject);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },

  deleteMatchedDeveloper: async (req, res) => {
    // delete userid(developer)from pending_developer-array and push it to developers_matched-array on userid
    //iduser(project)
    const id = req.user.idUser;
    //iduser(developer)
    const { user_id_d } = req.query;
    //projects/:id/addDeveloper?id=user_id(developer)

    try {
      const projectPending = await User.findOne({ _id: id });
      const developerPending = await User.findOne({ _id: user_id_d });

      // check if iduser(developer) already exists in developers_pending-array, if so then delete it from developer and project
      const result = await Project.exists({ _id: projectPending.id_project, developers_matched: user_id_d });

      if (result) {
        const removedDeveloper = await Project.findOneAndUpdate({ _id: projectPending.id_project }, { $pull: { developers_matched: user_id_d } });
        const removedProject = await Developer.findOneAndUpdate({ _id: developerPending.id_developer }, { $pull: { projects_matched: id } });

        res.json({
          removedDeveloper: removedDeveloper,
          removedProject: removedProject,
        });
        console.log(removedDeveloper, removedProject);
      }
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
  },
};

module.exports = projectController;
