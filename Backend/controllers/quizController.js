const User = require("../models/User");
const Quiz = require("../models/quiz");
const Question = require("../models/question");
const jwt = require("jsonwebtoken");

const createQuiz = async (req, res) => {
  const whoid = req.body.ownerid; // Assuming userId is in the request object
  const whoemail = req.email; // Assuming email is in the request object
  // const whoid = 123213; // Assuming userId is in the request object
  // const whoemail = 'req.email'; // Assuming email is in the request object

  try {
    const quiz = new Quiz({
      quizname: req.body.quizname,
      quizdescription: req.body.description,
      owner: whoid,
      owneremail: whoemail,
    });

    const savedQuiz = await quiz.save();
    if (savedQuiz) {
      res.status(200).json({ message: "Quiz added successfully!" });
    } else {
      res.status(500).json({ msg: "Failed to save the quiz" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

const addQuestion = async (req, res) => {
  try {
    const quizId = req.body.quizid;

    // Find questions for the specified quiz to determine the next questionId
    const questions = await Question.find({ quizid: quizId });

    const questionId = questions.length + 1;

    const newQuestion = new Question({
      quizid: quizId,
      questionId: questionId,
      questionText: req.body.questionText,
      answer: req.body.answer,
      options: req.body.options,
    });

    const savedQuestion = await newQuestion.save();

    if (savedQuestion) {
      return res.status(200).json({ message: "Question added successfully" });
    } else {
      return res.status(500).json({ msg: "Failed to add the question" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const uploadQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    console.log("upload back");
    console.log(req.body);

    // const quizId = req.body.id;
    try {
      const updatedQuiz = await Quiz.updateOne(
        { _id: quizId },
        { upload: true }
      );

      return res.json({ message: "Quiz uploaded!" });
    } catch {
      return res.json({ msg: "Something went wrong!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal server error" });
  }
};

const deleteQuiz = async (req, res) => {
  var id = req.params.id;

  try {
    await Quiz.deleteOne({ _id: id });
    var id_quiz=id.toString();
    await Question.deleteMany({ quizid: id_quiz });

    res
      .status(200)
      .json({ msg: "Quiz and associated questions deleted successfully." });
  } catch (err) {
    console.error("Error in deletion:", err);
    res.status(500).json({
      msg: "Something went wrong while deleting the quiz and associated questions.",
    });
  }
};

const getHomequiz = async (req, res) => {
  try {
    owner_id=req.params.id;
    const qz = await Quiz.find({ owner: owner_id, upload: true }).exec();

    if (qz) {
      res.json({ quiz: qz });
    } else {
      res.status(404).json({ msg: "No quizzes found" });
    }
  } catch (err) {
    console.error("Error in retrieving quizzes:", err);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

// const getAllQuestion = (req, res) => {
//   // const url = `http://localhost:4200/teacher/seequestion`
//   Question.find({ quizid: req.params.id }, (err, qz) => {
//     if (err) {
//       console.log(error);
//       res.json({ errormsg: "some error!" });
//     } else {
//       res.json({ msg: qz });
//     }
//   });
//   // res.redirect(
//   //     `${url}`)
// };

const getAllQuestion = async (req, res) => {
  try {
    const qz = await Question.find({ quizid: req.params.id }).exec();

    if (qz) {
      res.json({ msg: qz });
    } else {
      res.status(404).json({ errormsg: "No questions found" });
    }
  } catch (err) {
    console.error("Error in retrieving questions:", err);
    res.status(500).json({ errormsg: "Some error occurred" });
  }
};

const deleteQuestion = async (req, res) => {
  const id = req.params.id;

  try {
    const result = await Question.deleteOne({ _id: id }).exec();

    if (result.deletedCount === 1) {
      res.status(200).json({ msg: "Question deleted by admin" });
    } else {
      res.status(404).json({ msg: "Question not found" });
    }
  } catch (err) {
    console.error("Error in deleting question by admin:", err);
    res
      .status(500)
      .json({ msg: "Something went wrong while deleting the question" });
  }
};

module.exports = {
  createQuiz,
  addQuestion,
  uploadQuiz,
  deleteQuiz,
  getHomequiz,
  getAllQuestion,
  deleteQuestion,
};
