const MentorRouter = require("express").Router();
const MentorModel = require("../model/mentorsModel");

MentorRouter.get("/", (req,res) =>{
    MentorModel.find()
    .then((response) => 
    {   
        if(response.length > 0)
        {
            res.status(200).json({
                message: "Mentor Fetched Successfully",
                data: response
            });
        }
        else{
            res.status(200).json({
                message: "No Mentor Found",
                data: response
            });
        }
    })
    .catch((e) => 
        res.status(500).json({
        error: e,
    })
    );
})

MentorRouter.post("/create", (req,res) => {
    console.log(req.body);
    const Mentor = new MentorModel(req.body);
    Mentor.save()
        .then((response) => {
            if(response._id){
                res.status(201).json({
                    success: true,
                    message: "Mentor Created Successfully!!!"
                });
            }
            else{
                res.status(500).json({
                    error: "Something Wrong",
                });
            }
        })
        .catch((e) => {
            res.status(400).json({
            error: e
            });
        });
});

module.exports = MentorRouter;