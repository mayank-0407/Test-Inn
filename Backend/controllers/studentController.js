const user = require("../models/User");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
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
    csv()
      .fromFile(req.file.path)
      .then(async (res) => {
        for (var x = 0; x < res.length; x++) {
          var thispass = res[x].Email;
          var [new_username, domain] = thispass.split("@");
          var new_pass=new_username;
          new_username+=pass1;
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
    res.send("Students Added Successfully").status(200);
  } catch (err) {
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

module.exports = {
  importStudent,
  getAllQuestion,

};
