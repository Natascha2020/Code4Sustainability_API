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

    const validParams = paramsCheck([email, password, typeOfUser]);
    if (!validParams) {
      res.sendStatus(400).send("Please insert valid data");
      console.log("Error: invalid data on client request");
      return;
    }
    //check if user is a project owner, then create project, else go next (create developer)
    
    try {
      if(typeOfUser === "Project"){
      
          await Project.create({email:email}, (err, data) => {
            if(err){
              console.error(err);
              res.sendStatus(500);
              return
            }


          })}
      console.log("A");
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  },

  addDeveloper: async (req, res, next) => {
    const {id} = req.params;
    const {developer_id} = req.query
    //projects/req.params/addDeveloper?developer_id=req.query



    await Project.findOneAndUpdate({_id:id}, {$set: {$push: {developers_pending: developer_id}}}, (err, data) => {
        if (err){
          console.error(err);
          res.sendStatus(500);
          return
        }
        return(data);
    })
  },

}

module.exports = projectController;
