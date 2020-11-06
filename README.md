# Code4Sustainability_API
Backend with restful API

# Stack

- [Node.js](https://nodejs.org/)
- GIT/GITHUB (code management)
- [MongoDB](https://www.mongodb.com/de) (NoSQL-datamanagementsystem)

# How to run locally

- System requirements: [Node.js](https://nodejs.org/)
- Fork the repository
- Clone it to your local repo
- Run "npm install" to install dependencies
- Run "npm start" to run local server
- See .env.sample for environment variables

# Structure

| File                   | Description                                 |
| ---------------------- | ------------------------------------------- |
| server.js              | Server and endpoints (main file)            |
| dbConfig.js            | Configuration of database (MongoDB)         |
| userRoutes.js          | Configuration of users routes               |
| projectRoutes.js       | Configuration of project routes             |
| developerRoutes.js     | Configuration of developer routes           |
| Developer.js           | Model for mongoDB database                  |
| Project.js             | Model for mongoDB database                  |
| User.js                | Model for mongoDB database                  |
| usersController.js     | Controllers for users endpoints             |
| projectController.js   | Controllers for project endpoints           |
| developerController.js | Controllers for developerendpoints          |
| verifyAuth.js          | Verify accessToken via public key           |

# Front-end

[Code4Sustainability react App](https://github.com/Natascha2020/Code4Sustainability_APP.git)
