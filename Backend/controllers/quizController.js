const User = require("../models/User");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");
const jwt = require("jsonwebtoken");
const CsvParser = require("json2csv").Parser;

const createQuiz = async (req, res) => {
  const whoid_ = req.body.ownerid; // Assuming userId is in the request object
  const whoemail = req.body.email; // Assuming email is in the request object
  // const whoid = 123213; // Assuming userId is in the request object
  // const whoemail = 'req.email'; // Assuming email is in the request object
  whoid = whoid_.toString();
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
    const questions = await Question.find({ quizid: quizId });
    const questionId = questions.length + 1;
    var queOptions = req.body.options;
    const queAnswer = req.body.answer;
    console.log(queOptions);
    console.log(queAnswer);
    if (queOptions.includes(queAnswer) == false) {
      return res
        .status(203)
        .json({ message: "The Options Must contain the answer!" });
    }

    const newQuestion = new Question({
      quizid: quizId,
      questionId: questionId,
      questionText: req.body.questionText,
      answer: req.body.answer,
      options: queOptions,
      ismcq:true
    });

    const savedQuestion = await newQuestion.save();

    if (savedQuestion) {
      return res.status(200).json({ message: "Question added successfully!" });
    } else {
      return res.status(400).json({ message: "Failed to add the question!" });
    }
  }
   catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Unknown server error!" });
  }
};

const addQuestionFillUp = async (req, res) => {
  try {
    const quizId = req.body.quizid;
    const questions = await Question.find({ quizid: quizId });
    const questionId = questions.length + 1;

    const newQuestion = new Question({
      quizid: quizId,
      questionId: questionId,
      questionText: req.body.questionText,
      answer: req.body.answer,
      options: [],
      ismcq:false
    });

    const savedQuestion = await newQuestion.save();

    if (savedQuestion) {
      return res.status(200).json({ message: "Question added successfully!" });
    } else {
      return res.status(400).json({ message: "Failed to add the question!" });
    }
  }
   catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Unknown server error!" });
  }
};

const uploadQuiz = async (req, res) => {
  const quizId = req.params.id;
  try {
    // const quizId = req.body.id;
    try {
      const updatedQuiz = await Quiz.updateOne(
        { _id: quizId },
        { upload: true }
      );
      console.log("Quiz uploaded successfully!");
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
    var id_quiz = id.toString();
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
    owner_id_ = req.params.id;
    owner_id = owner_id_.toString();
    const qz = await Quiz.find({ owner: owner_id });

    if (qz) {
      console.log(qz);
      res.status(200).json(qz);
    } else {
      res.status(203).json({ msg: "No quizzes found" });
    }
  } catch (err) {
    console.error("Error in retrieving quizzes:", err);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

const setResult = async (req, res) => {
  try {
    var quiz_id = req.body.quizid;
    var student_id = req.body.studentid;
    var total_marks_ = req.body.thistotal;
    total_marks_++;
    var total_marks = total_marks_.toString();

    try {
      const dbUser = await User.findOne({ studentid: student_id }).exec();
      const result = new Result({
        studentid: student_id,
        quizid: quiz_id,
        email: dbUser.email,
        marks: total_marks,
      });

      const savedResult = await result.save();
      if (savedResult) {
        res.status(200).json({ message: "Result added successfully!" });
      } else {
        res.status(500).json({ msg: "Failed to save the Result" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Some error occurred" });
    }
  } catch (err) {
    console.error("Error in retrieving quizzes:", err);
    res.status(500).json({ msg: "Some error occurred" });
  }
};

const getAllQuestion = async (req, res) => {
  try {
    const qz = await Question.find({ quizid: req.params.id }).exec();

    if (qz) {
      res.json(qz);
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

const exportResult = async (req, res) => {
  try {
    const id = req.params.id;
    let myResult = [];
    var allResult = await Result.find({ quizid: id });
    allResult.forEach((result) => {
      const { quizid, email, marks } = result;
      myResult.push({ quizid, email, marks });
    });

    const csvField = ["QuizId,Email,Marks"];
    const csvparser = new CsvParser({ csvField });
    csvData = csvparser.parse(myResult);
    res.setHeader("content-type", "text/csv");
    res.setHeader("content-Disposition", "attachment:filename=Result.csv");
    res.status(200).end(csvData);
  } catch (err) {
    res
      .status(500)
      .json({ msg: "Something went wrong while exporting the question" });
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
  setResult,
  exportResult,
  addQuestionFillUp,
};
