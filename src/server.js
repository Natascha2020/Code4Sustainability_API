require("dotenv").config();
require("./dbConfig");

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const io = require("socket.io");

const userRoutes = require("./Routes/userRoutes");
const developerRoutes = require("./Routes/developerRoutes");
const projectRoutes = require("./Routes/projectRoutes");

const app = express();
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
app.use(cookieParser());
app.use(fileUpload());

/* io.on("connection", (socket) => {
  console.log("a user connected");
   socket.on('disconnect', () => {
    console.log('user disconnected');
}); */

// Middlewares for Routes
app.use("/users", userRoutes);
app.use("/developer", developerRoutes);
app.use("/project", projectRoutes);

app.listen(port, () => console.log("Server is running on port " + port));
