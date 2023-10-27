const { Router } = require("express");
const quizController = require("../controllers/quizController");

const router = Router();

router.post("/create", quizController.createQuiz);
router.post("/question/create", quizController.addQuestion);

module.exports = router;