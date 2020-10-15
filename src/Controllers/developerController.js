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
        await Developer.create({email:email}, (err, data) => {
          if(err){
            console.error(err);
            res.sendStatus(500);
            return
          }

        })}
        console.log("B");
      next();



    } catch (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }
  },


}

module.exports = developerController;
