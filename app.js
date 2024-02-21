const express = require("express");
const APP_SERVER = express();

// Inject API Controller
APP_SERVER.use("/api/mentor", require("./controller/mentorsController"));
APP_SERVER.use("/api/student", require("./controller/studentsController"));

module.exports = APP_SERVER;