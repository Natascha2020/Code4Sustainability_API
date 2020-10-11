require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");

const developerRoutes = require("./Routes/developerRoutes");
const projectRoutes = require("./Routes/projectRoutes");

const app = express();

// Middlewares to parse pody-text format as url encoded data/json received from client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middlewares for Routes
app.use("/developer", developerRoutes);
app.use("/projects", projectRoutes);

app.listen(4000, () => console.log("Server is running on Port 4000"));
