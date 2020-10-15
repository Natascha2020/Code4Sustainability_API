// import specific model for database
const User = require("../Models/User");
const Project = require("../Models/Project");
const Developer = require("../Models/Developer");
const paramsCheck = require("../Helpers/paramsCheck");

//Import bcyrpt for hashing password
const bcrypt = require("bcrypt");

const userController = {
  getAllUsers: (req, res) => {
    User.find({}, (err, data) => {
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

  createUser: async (req, res) => {
    const { email, password, typeOfUser } = req.body;
    // params check already done
    // salting users plain text password through hashing function to save as hash in database
    // sending back to client projectname and id
    console.log("Test F")
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      
      // checking if project or developer profile was created and assigning reference-id accordingly
      let project = await Project.findOne({email: email}) 
      project? project = project._id: "null";
      
      let developer = await Developer.findOne({email: email}) 
      developer? developer = developer._id: "null";
      
      const newUser = await User.create({email: email, password: hash, typeOfUser:typeOfUser, id_developer: developer, id_project: project});
      res.json({ email: email, id: newUser._id, typeOfUser: typeOfUser });
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  },

  deleteUserByEmail: async (req, res, next) => {
      const {email} = req.params;
      console.log(email);
      await User.findOneAndDelete({email: email}, (err, data) => {
        next();
        if (err){
        console.error(err);
        res.sendStatus(500);
        return
        }
      })},

  getUserById: async (req, res, next) => {
    const {id} = req.params;
    const result = await User.findOne({_id: id}, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return
      }
      res.json({_id: id, email: result.email, typeOfUser: result.typeOfUser, username:result.username });
    })
  },

  updateUserById: (req, res, next) => {},

 
}

module.exports = userController;