const { Router } = require("express");
const dataEngineering = require("../controllers/dataengineering");
const insertintodb = require("../controllers/insertManyUsers");

const router = Router();

router.post("/updateuser", dataEngineering.updateUser);
router.get("/createindex", dataEngineering.createIndexes);
router.get("/getquiz", dataEngineering.getQuizzesWithQuestionCounts);
router.post("/getquizbyname", dataEngineering.getQuizByName);
router.post("/getquestionbytext", dataEngineering.searchQuestionByText);
router.post("/compareresults", dataEngineering.compareResults);

module.exports = router;
