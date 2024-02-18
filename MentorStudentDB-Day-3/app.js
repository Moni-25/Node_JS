const express = require("express");
const APP_SERVER = express();

// Inject API Controller
APP_SERVER.use("/api/mentor", require("./controller/mentor_Controller"));
APP_SERVER.use("/api/student", require("./controller/student_Controller"));

module.exports = APP_SERVER;