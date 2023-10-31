const { Router } = require("express");
const quizController = require("../controllers/quizController");
const studentController = require("../controllers/studentController");

const router = Router();

router.post("/create", quizController.createQuiz);
router.post("/submit", quizController.setResult);
router.post("/question/create", quizController.addQuestion);
router.post("/upload/:id", quizController.uploadQuiz);
router.post("/deletes/:id", quizController.deleteQuiz);
router.get("/:id", quizController.getHomequiz);
router.get("/question/:id", quizController.getAllQuestion);
router.post("/question/delete/:id", quizController.deleteQuestion);
router.get("/student/show/:id", studentController.getAllQuestion);
router.get("/get/result/:id", quizController.exportResult);

module.exports = router;