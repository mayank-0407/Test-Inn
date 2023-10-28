const { Router } = require("express");
const quizController = require("../controllers/quizController");

const router = Router();

router.post("/create", quizController.createQuiz);
router.post("/question/create", quizController.addQuestion);
router.post("/upload/:id", quizController.uploadQuiz);
router.post("/deletes/:id", quizController.deleteQuiz);
router.get("/:id", quizController.getHomequiz);
router.get("/question/:id", quizController.getAllQuestion);

module.exports = router;