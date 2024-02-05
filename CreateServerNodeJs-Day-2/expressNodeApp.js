const express = require("express");
const HTTP_SERVER = express();
//using for Post Method
const body = require("express")
const bodyparser = require("body-parser")

const port = 5000;

// Injecting the Middleware (BodyParser)
HTTP_SERVER.use(bodyparser.json());

HTTP_SERVER.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
})

HTTP_SERVER.get("/", (req, res) => {
    res.status(200).json({
        message: "Express Successful"
    })
})

HTTP_SERVER.get("/user/:id", (req, res) => {
    const param = req.params;
    const queryParam = req.query;
    console.log(param,queryParam)
    res.status(200).json({
        message: "Get With Id"
    })
})

HTTP_SERVER.post("/", (req, res) => {
    console.log(req.body)
    res.status(200).json({
        message: "Post Request Hit"
    })
})