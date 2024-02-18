const StudentController = require("express").Router();
const StudentModel = require("../model/student_Model");

StudentController.get("/", (req, res) =>{
    //console.log(StudentModel);
    StudentModel.find()
        .then((response) => {
            if(response.length > 0)
            {
                res.status(200).json({
                    message: "Student Fetched Successfully",
                    data: response
                });
            }
            else{
                res.status(200).json({
                    message: "No Student Found",
                    data: response
                });
            }
        })
        .catch((e) => {
            res.status(500).json({
                error: e,
            });
        });
})

StudentController.post("/create", (req,res) => {
    //console.log(req.body);
    const Stud = new StudentModel(req.body);
    Stud.save()
        .then((response) => {
            if(response._id){
                res.status(201).json({
                    success: true,
                    message: "Student Created Successfully!!!"
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
                error: e,
            });
        });
})

// A student who has a mentor should not be shown in List

StudentController.get('/not_assign_mentor', (req,res) => {
    const students = StudentModel.find({mentorId:undefined})
    .then((response) => {
        if(response.length > 0)
        {
            res.status(200).json({
                message: "List of student who doesn't have mentor",
                data: response
            });
        }
        else{
            res.status(200).json({
                message: "No Student Found who have not a mentor",
                data: response
            });
        }
    })
    .catch((e) => {
        res.status(500).json({
            error: e,
        });
    });
})

// Select one mentor and Add multiple Student 

StudentController.patch("/assign_students", async (req,res) => {
    const {mentor,stud_list} = req.body;
    console.log(mentor, stud_list)
    try{
        console.log("Hi")
            const student = await StudentModel.findById(stud_list)
            console.log(student)
            student.mentorId = mentor;
            await student.save();
    
        res.send("Updated Successfully");  
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

// Select One Student and Assign one Mentor

StudentController.patch('/assign-mentor/:id',async (req,res) => {
    const {id} = req.params; // student Id
    console.log(id)
    const {mentor} = req.body;
    console.log(mentor)
    try{
        const student = await StudentModel.findById(id);
        student.mentorId = mentor;
        await student.save();
        res.send(student);
    }catch(err){
        res.status(500);
        res.send(err);
    }
})

// Show all students for a particular mentor

StudentController.get("/show_studemts_for_mentor/:id", async (req, res) => {
    const {id} = req.params;
    /*StudentModel.find({mentorId: id})
        .then((response) => {
            if(response.length > 0){
                res.status(200).json({
                    message: "List of students for particular mentor",
                    data: response
                })
            }
            else{
                res.status(200).json({
                    message: "No student assign for this mentor",
                    data: response
                })
            }
        })
        .catch((e) => {
            res.status(500).json({
                error: e,
            });
        });
    */
   try{
        const studentList = await StudentModel.find({mentorId: id});
        res.status(200).send(studentList);
   }
   catch(error)    
   {
        res.send(error);
   }
})

module.exports = StudentController;