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
    console.log("C");
    try {
      const saltRounds = 10;
      const hash = await bcrypt.hash(password, saltRounds);
      
      // checking if project or developer profile was created and assigning reference-id accordingly
    
      let project = await Project.findOne({email: email}) 
      project? project = project._id: "null";
      
      let developer = await Developer.findOne({email: email}) 
      developer? developer = developer._id: "null";
      
      console.log("D");
      const newUser = await User.create({email: email, password: hash, typeOfUser:typeOfUser, id_developer: developer, id_project: project});
      res.json({ email: email, id: newUser._id, typeOfUser: typeOfUser });
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  },

  // delete user profile and go next to delete developer or project profile accordingly
  deleteUserById: async (req, res, next) => {
      const {id} = req.params;
      if (!paramsCheck([id])) {
        res.sendStatus(400);
        console.log("Error: invalid data on client request");
        return;
      }
      const user = await User.find({_id: id}, (err, data) => {
        if (err){
        console.error(err);
        res.sendStatus(500);
        return
        }
      })
      console.log("Test", user);
      if(user.typeOfUser && user.typeOfUser === "Project"){
      await Project.findOneAndDelete({_id: user.project_id}, (err, data) => {
        if (err){
        console.error(err);
        res.sendStatus(500);
        return
        }
      })}
      if(user.typeOfUser && user.typeOfUser === "Developer"){
      await Developer.findOneAndDelete({_id: user.developer_id}, (err, data) => {
        if (err){
        console.error(err);
        res.sendStatus(500);
        return
        }
      })
      
      await User.findAndDelete({_id: id}, (err, data) => {
        if (err){
        console.error(err);
        res.sendStatus(500);
        return
        }
      })
      }
    },

  // find specific user by email
  getUserById: async (req, res, next) => {
    const {id} = req.params;
    console.log(id);

    if(!paramsCheck([id])) {
      res.sendStatus(400);
      console.log("Error: invalid data on client request");
      return;
    }

    const result = await User.findOne({_id:id}, (err, data) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
        return
      }
      })
    console.log(result);
    res.json({id: result._id, email: result.email, typeOfUser: result.typeOfUser, username:result.username });
   
  },

  // update user information according to given changes on client request, sending back updated data to client
  updateUserById: async (req, res) => {
    const {email, name, video , password, webpage, image, location, question1, question2, question3, answer1, answer2, answer3} = req.body;
    const {id} = req.params;
    let newHash = ""
    if(password && password.length){
    const saltRounds = 10;
    newHash = await bcrypt.hash(password, saltRounds);
    }

    // check validity of every single parameter and delete it from object used to update data
    const updatedValue= {email: email, name: name , password:newHash, video:video , webpage:webpage, image:image, location:location, question1:question1, question2:question2, question3:question3, answer1:answer1, answer2:answer2, answer3:answer3 };

    if(!email || email==="" )delete updatedValue.email;
    if(!name || name==="" )delete updatedValue.name;
    if(!password || password==="" )delete updatedValue.password;
    if(!video || video==="" )delete updatedValue.video;
    if(!webpage || webpage==="" )delete updatedValue.webpage;
    if(!image || image==="" )delete updatedValue.image;
    if(!location || location==="" )delete updatedValue.location;
    if(!question1 || question1==="" )delete updatedValue.question1;
    if(!question2 || question2==="" )delete updatedValue.question2;
    if(!question3 || question3==="" )delete updatedValue.question3;
    if(!answer1 || answer1==="" )delete updatedValue.answer1;
    if(!answer2 || answer2==="" )delete updatedValue.answer3;
    if(!answer3 || answer3==="" )delete updatedValue.answer3;

    const result = await User.findOneAndUpdate({_id:id}, {$set: updatedValue}, (err, data) => {
      if (err){
        console.error(err);
        res.sendStatus(500);
        return
      }
      return(data);

      })
      console.log("result", result)
    res.json({email: result.email, name:result.name, video:result.video , password:result.newHash, webpage:result.webpage, image:result.image, location:result.location, question1:result.question1, question2:result.question2, question3:result.question3, answer1:result.answer1, answer2:result.answer2, answer3:result.answer3 })
  },
    
  // get dashboard depending on typeOfUser by specific id
  getDashboard: async (req, res) => {
    const {id} = req.params;
    
    if(!paramsCheck([id])) {
      res.sendStatus(400);
      console.log("Error: invalid data on client request");
      return;
    }

    const result = await User.find({}, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        console.log("Error: data not found in database");
        return;
      }
    })
    
    // check if user is a project owner and send developer lists as response
    if(result.typeOfUser && result.typeOfUser === "Project"){
        let project = await Project.findOne({_id: result.id_project}, (err, data) => {
          if (err) {
            res.sendStatus(500);
            console.error(err);
            console.log("Error: data not found in database");
            return;
          }
        }) 
        res.json({developers_pending: project.developers_pending, developers_matched: project.developers_matched, email: email})
  }
    // check if user is a developer and send project lists as response
  if(result.typeOfUser && result.typeOfUser === "Developer"){
    let developer = await Developer.findOne({_id: result.id_developer}, (err, data) => {
      if (err) {
        res.sendStatus(500);
        console.error(err);
        console.log("Error: data not found in database");
        return;
      }
    }) 
    res.json({projects_pending: developer.projects_pending, projects_matched: developer.projects_matched, email: email})
}


}}

module.exports = userController;