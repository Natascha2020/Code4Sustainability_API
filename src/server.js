require("dotenv").config();
require("./dbConfig");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookie = require("cookie");

const userRoutes = require("./Routes/userRoutes");
const developerRoutes = require("./Routes/developerRoutes");
const projectRoutes = require("./Routes/projectRoutes");

const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET, POST, PUT, DELETE, HEAD",
    allowHeaders: "Origin, X-Requested-With, Content-Type, Accept",
    exposedHeaders: "Content-Range,X-Content-Range",
    preflightContinue: true,
    credentials: true,
  })
);

// Middlewares to parse pody-text format as url encoded data/json received from client
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, _, next) => {
  req.cookies = cookie.parse(req.headers.cookie || "");
  next();
});

// Middlewares for Routes
app.use("/users", userRoutes);
app.use("/developer", developerRoutes);
app.use("/project", projectRoutes);

app.listen(port, () => console.log("Server is running on port " + port));
