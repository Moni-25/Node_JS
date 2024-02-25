const express = require("express");
const bodyParser = require("body-parser");
const HTTP_SERVER = express();
const port = 5000;
const hostname = "0.0.0.0";
const { connectDatabase } = require("./dbConfigure");

connectDatabase();
HTTP_SERVER.use(bodyParser.json());

HTTP_SERVER.listen((port), ()=>{
    console.log(`Server Started On http://localhost:${port}`);
})

HTTP_SERVER.use("/", require("./app"));

