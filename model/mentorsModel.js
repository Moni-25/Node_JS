const { default: mongoose} = require("mongoose");

const MentorSchema = mongoose.Schema({
    mentorName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    course: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("mentor", MentorSchema);