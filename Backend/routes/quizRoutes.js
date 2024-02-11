const { Router } = require("express");
const quizController = require("../controllers/quizController");
const studentController = require("../controllers/studentController");

const router = Router();

router.post("/create", quizController.createQuiz);
router.post("/submit", quizController.setResult);
router.post("/question/create", quizController.addQuestion);
router.post("/question/fillup/create", quizController.addQuestionFillUp);
router.post("/upload/:id", quizController.uploadQuiz);
router.post("/deletes/:id", quizController.deleteQuiz);
router.post("/student/deletes/:id", studentController.deleteStudent);
router.get("/:id", quizController.getHomequiz);
router.get("/students/:id", quizController.getStudents);
router.get("/question/:id", quizController.getAllQuestion);
router.post("/question/delete/:id", quizController.deleteQuestion);
router.get("/student/show/:id", studentController.getAllQuestion);
router.get("/get/result/:id", quizController.exportResult);

module.exports = router;