const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectname: String,
  email: String,
  password: String,
  video: String,
  webpage: String,
  image: String,
  location: String,
  date: { type: Date, default: Date.now },
  qa1: String,
  qa2: String,
  qa3: String,
});

module.exports = mongoose.model("Project", projectSchema);
