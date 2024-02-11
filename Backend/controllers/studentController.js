const user = require("../models/User");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const csv = require("csvtojson");
const bcrypt = require("bcrypt");

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const importStudent = async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  try {
    var pass1 = getRandomNumber(100000, 99999999);
    var userData = [];
    var thisid = req.params.id;
    const id = thisid.toString();
    console.log("hi1");
    csv()
      .fromFile(req.file.path)
      .then(async (res) => {
        for (var x = 0; x < res.length; x++) {
          var thispass = res[x].Email;
          var [new_username, domain] = thispass.split("@");
          var new_pass = new_username;
          new_username += pass1;
          new_pass += pass1;
          const hashedPassword = await bcrypt.hash(new_pass, 10);

          userData.push({
            name: res[x].Name,
            email: res[x].Email,
            password: hashedPassword,
            isStudent: true,
            quizid: id,
            studentid: new_username,
          });
        }
        await user.insertMany(userData);
      });
    res.status(200).send("Students Added Successfully");
  } catch (err) {
    res.status(500).send("Error while uploading students");
    console.log(err);
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const qz = await Question.find({ quizid: req.params.id }).exec();
    // console.log(req.params.id);
    if (qz) {
      // console.log(qz);
      res.status(200).json(qz);
    } else {
      res.status(404).json({ errormsg: "No questions found" });
    }
  } catch (err) {
    console.error("Error in retrieving questions:", err);
    res.status(500).json({ errormsg: "Some error occurred" });
  }
};

const deleteStudent = async (req, res) => {
  const id = req.params.id;

  try {
  const result = await user.deleteOne({ _id: id }).exec();

  if (result.deletedCount === 1) {
    res.status(200).json({ message: "Student deleted by admin" });
  } else {
    res.status(404).json({ message: "Student not found" });
  }
  } catch (err) {
    console.error("Error in deleting Student by admin:", err);
    res
      .status(500)
      .json({ msg: "Something went wrong while deleting the Student" });
  }
};

module.exports = {
  importStudent,
  getAllQuestion,
  deleteStudent,
};
