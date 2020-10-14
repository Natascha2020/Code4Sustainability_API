require("dotenv").config();
require("./dbConfig");

const express = require("express");
const bodyParser = require("body-parser");

const userRoutes = require("./Routes/userRoutes");
const developerRoutes = require("./Routes/developerRoutes");
const projectRoutes = require("./Routes/projectRoutes");

const app = express();
const port = process.env.PORT || 5000;

// Middlewares to parse pody-text format as url encoded data/json received from client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middlewares for Routes
app.use("/users", userRoutes);
app.use("/developers", developerRoutes);
app.use("/projects", projectRoutes);

app.listen(port, () => console.log("Server is running on Port " + port));
