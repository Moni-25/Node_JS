const express = require("express");
const bodyParser = require("body-parser");
const HTTP_SERVER = express();
const port = 5000;

HTTP_SERVER.use(bodyParser.json());

HTTP_SERVER.listen((port), ()=>{
    console.log(`Server Started On http://localhost:5000:${port}`);
})

HTTP_SERVER.use("/")