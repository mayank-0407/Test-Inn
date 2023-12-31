const mongoose = require("mongoose");
const { isEmail } = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],
    minlength: [6, "Minimum password length is 6"],
  },
  isStudent: {
    type: Boolean,
    required: [true, "Please Enter account Type"],
    default: false,
  },
  quizid:{
    type:String,
    required:[true,"Please Enter Quiz ID"]
  }
});

const Student = mongoose.model("student", studentSchema);

module.exports = Student;
