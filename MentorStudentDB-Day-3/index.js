const express = require("express");
const bodyParser = require("body-parser");
const HTTP_SERVER = express();
const port = 5000;
const { connectDatabase } = require("./dbConfig");

//Enabling Application Level ENV
require("dotenv").config();
console.log(process.env);

connectDatabase();
HTTP_SERVER.use(bodyParser.json());

HTTP_SERVER.listen(port, process.env.HOSTNAME, ()=>{
    console.log(`Server Started On http://localhost:${port}`);
})

HTTP_SERVER.use("/", require("./app"));

