const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const developerSchema = new Schema({
  username: String,
  email: String,
  password: String,
  video: String,
  github: String,
  webpage: String,
  avatar: String,
  location: String,
  date: { type: Date, default: Date.now },
  qa1: String,
  qa2: String,
  qa3: String,
});

module.exports = mongoose.model("Developer", developerSchema);
