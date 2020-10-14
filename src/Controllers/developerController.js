// import specific model for database
const Developer = require("../Models/Developer");
const paramsCheck = require("../Helpers/paramsCheck");

const developerController = {

  // get all developers 
  getAllDevelopers: (req, res) => {
    Developer.find({}, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        console.log("Error: data not found in database");
        return;
      }
      console.log(data);
      res.json(data);
    });
  },

  createDeveloper: async (req, res, next) => {
    const { email, password, typeOfUser } = req.body;
    console.log(email, password, typeOfUser);

    const validParams = paramsCheck([email, password, typeOfUser]);
    if (!validParams) {
      res.sendStatus(400).send("Please insert valid data");
      console.log("Error: invalid data on client request");
      return;
    }
    //check if user is a developer, then create developer
    try {
      if(typeOfUser === "Developer"){
      await Developer.create({email: email });
      }
      next();
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  },

  // if user is a developer, delete user not only in user, but in developer collection as well
  deleteDeveloperByEmail: async (req, res) => {
    const {email} = req.params;
    await Developer.findOneAndDelete({email: email}, (err, data) => {
      if (err){
        console.error(err);
        res.sendStatus(500);
        return
        }
      res.send("Developer successfully deleted!");
      console.log("Developer successfully deleted!");
  })
},
}

module.exports = developerController;
