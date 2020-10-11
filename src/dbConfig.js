const mongoose = require("mongoose");
//mongoose automatically runs by default on port 27017

//connection-String:
const mongoDB = "mongodb+srv://Developer:LifeHack@code4sustainability.75mtd.mongodb.net/HomepageData?retryWrites=true&w=majority";
/*   "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@code4sustainability.75mtd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority"; */

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

console.log(mongoDB);
//connect to mongoose using db
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on("error", console.error.bind(console, "MongoDB connection error:"));

module.exports = db;
