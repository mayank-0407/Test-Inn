const user = require("../models/User");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const csv = require("csvtojson");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");
const Result = require("../models/Result");

const updateUser = async (req, res) => {
  const userEmailToUpdate = req.body.email;
  const updatedFields = {
    name: req.body.name,
    isStudent: req.body.isStudent,
  };
  console.log(userEmailToUpdate, updatedFields);
  try {
    const updatedUser = await user.findOneAndUpdate(
      { email: userEmailToUpdate },
      { $set: updatedFields },
      { new: true, useFindAndModify: false }
    );

    if (updatedUser) {
      return res
        .status(200)
        .json({ message: "User updated successfully", user: updatedUser });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

async function createIndexes(req, res) {
  try {
    await Quiz.createIndexes();
    await Question.createIndexes();
    res.status(200).send("Indexes created successfully.");
  } catch (err) {
    console.error("Error creating indexes:", err);
    res.status(500).send("Error creating indexes.");
  }
}

// Function for aggregation
async function getQuizzesWithQuestionCounts(req, res) {
  try {
    const quizAggregation = await Quiz.aggregate([
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "quizid",
          as: "questions",
        },
      },
      {
        $project: {
          quizname: 1,
          questionCount: { $size: "$questions" },
        },
      },
    ]);
    res.status(200).json(quizAggregation);
  } catch (err) {
    console.error("Error aggregating quizzes:", err);
    res.status(500).send("Error aggregating quizzes.");
  }
}

async function getQuizByName(req, res) {
  const quizName = req.body.quizName;
  console.log(quizName);

  try {
    // Start performance tracking
    const start = Date.now();

    // Querying the quiz by name
    const quiz = await Quiz.findOne({ quizname: quizName });
    console.log(quiz);
    // Calculate the time taken for the query
    const duration = Date.now() - start;

    // Retrieve the scan type and documents scanned
    const scanType = quiz ? "index" : "collectionScan";
    const documentsScanned = quiz ? 1 : 0;

    // Send response with quiz data, scan type, and documents scanned
    res.status(200).json({
      quiz: quiz,
      scanType: scanType,
      documentsScanned: documentsScanned,
      duration: duration + "ms",
    });
  } catch (err) {
    console.error("Error retrieving quiz:", err);
    res.status(500).send("Error retrieving quiz.");
  }
}
async function searchQuestionByText(req, res) {
  let searchText = req.body.searchText;

  try {
    console.log("Search text:", searchText);

    // Convert searchText to string if it's not already
    if (typeof searchText !== "string") {
      searchText = JSON.stringify(searchText);
    }

    // Perform text search on questionText and options fields and sort by relevance score
    const searchResults = await Question.find(
      { $text: { $search: searchText } },
      { score: { $meta: "textScore" } }
    ).sort({ score: { $meta: "textScore" } });

    console.log("Search results:", searchResults);

    // If no results found
    if (searchResults.length === 0) {
      return res.status(404).json({ message: "No matching questions found." });
    }

    // Send response with search results
    res.status(200).json(searchResults);
  } catch (err) {
    console.error("Error searching questions:", err);
    res.status(500).send("Error searching questions.");
  }
}

async function compareResults(req, res) {
  const { quizid, value } = req.body;

  try {
    // Convert value to string
    const stringValue = value;

    // Perform aggregation
    const results = await Result.aggregate([
      { $match: { quizid: quizid } },
      {
        $group: {
          _id: {
            $cond: {
              if: { $gt: ["$marks", stringValue] },
              then: "greaterThan",
              else: {
                $cond: {
                  if: { $lt: ["$marks", stringValue] },
                  then: "lessThan",
                  else: {
                    $cond: {
                      if: { $gte: ["$marks", stringValue] },
                      then: "greaterThanOrEqual",
                      else: {
                        $cond: {
                          if: { $lte: ["$marks", stringValue] },
                          then: "lessThanOrEqual",
                          else: "notIn",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          results: { $push: "$$ROOT" },
        },
      },
    ]);

    // Construct response object
    const groupedResults = {};
    results.forEach((result) => {
      groupedResults[result._id] = result.results;
    });

    // If no results found
    if (
      Object.values(groupedResults).every((results) => results.length === 0)
    ) {
      return res.status(404).json({ message: "No matching results found." });
    }

    // Send response with grouped results
    res.status(200).json(groupedResults);
  } catch (err) {
    console.error("Error comparing results:", err);
    res.status(500).send("Error comparing results.");
  }
}

module.exports = {
  updateUser,
  createIndexes,
  getQuizzesWithQuestionCounts,
  getQuizByName,
  searchQuestionByText,
  compareResults,
};
