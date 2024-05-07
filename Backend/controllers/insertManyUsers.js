const user = require("../models/User");
const Quiz = require("../models/Quiz");
const Question = require("../models/Question");
const Result = require("../models/Result");
const csv = require("csvtojson");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

const insertManyUsers = async () => {
  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      isStudent: true,
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password456",
      isStudent: false,
    },
    {
      name: "Alice Johnson",
      email: "alice@example.com",
      password: "password789",
      isStudent: true,
    },
    // Add more dummy users here
    {
      name: "Bob Brown",
      email: "bob@example.com",
      password: "password111",
      isStudent: false,
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      password: "password222",
      isStudent: true,
    },
    {
      name: "Michael Wilson",
      email: "michael@example.com",
      password: "password333",
      isStudent: false,
    },
    {
      name: "Sophia Martinez",
      email: "sophia@example.com",
      password: "password444",
      isStudent: true,
    },
    {
      name: "David Anderson",
      email: "david@example.com",
      password: "password555",
      isStudent: false,
    },
    {
      name: "Olivia Taylor",
      email: "olivia@example.com",
      password: "password666",
      isStudent: true,
    },
    {
      name: "Daniel Thomas",
      email: "daniel@example.com",
      password: "password777",
      isStudent: false,
    },
    {
      name: "Isabella Hernandez",
      email: "isabella@example.com",
      password: "password888",
      isStudent: true,
    },
    {
      name: "Alexander Walker",
      email: "alexander@example.com",
      password: "password999",
      isStudent: false,
    },
    {
      name: "Mia King",
      email: "mia@example.com",
      password: "password000",
      isStudent: true,
    },
    {
      name: "Ethan Lee",
      email: "ethan@example.com",
      password: "password111",
      isStudent: false,
    },
    {
      name: "Ava Perez",
      email: "ava@example.com",
      password: "password222",
      isStudent: true,
    },
    {
      name: "Benjamin Hall",
      email: "benjamin@example.com",
      password: "password333",
      isStudent: false,
    },
    {
      name: "Charlotte Garcia",
      email: "charlotte@example.com",
      password: "password444",
      isStudent: true,
    },
    {
      name: "Amelia Young",
      email: "amelia@example.com",
      password: "password555",
      isStudent: false,
    },
    {
      name: "William Hernandez",
      email: "william@example.com",
      password: "password666",
      isStudent: true,
    },
    {
      name: "Victoria Lopez",
      email: "victoria@example.com",
      password: "password777",
      isStudent: false,
    },
  ];

  try {
    const insertedUsers = await user.insertMany(users);
    console.log("Users inserted successfully:", insertedUsers);
  } catch (error) {
    console.error("Error inserting users:", error);
  }
};

// insertManyUsers();

async function createQuizWithQuestions() {
  try {
    // Step 1: Create a quiz
    const newQuiz = new Quiz({
      quizname: "Sample Quiz",
      quizdescription: "This is a sample quiz",
      owner: "Sample Owner",
      owneremail: "owner@example.com",
    });

    // Save the quiz to the database
    const savedQuiz = await newQuiz.save();

    // Step 2: Retrieve the quiz ID
    const quizId = savedQuiz._id;

    const questions = [
      {
        quizid: quizId,
        questionId: "Question 1",
        questionText: "What is the capital of France?",
        answer: "Paris",
        options: ["London", "Berlin", "Madrid", "Paris"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 2",
        questionText: "Who wrote 'To Kill a Mockingbird'?",
        answer: "Harper Lee",
        options: ["Harper Lee", "J.K. Rowling", "Stephen King", "Jane Austen"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 3",
        questionText: "What is the chemical symbol for water?",
        answer: "H2O",
        options: ["H2O", "CO2", "NaCl", "O2"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 4",
        questionText: "Which planet is known as the Red Planet?",
        answer: "Mars",
        options: ["Venus", "Jupiter", "Mars", "Saturn"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 5",
        questionText: "What is the tallest mountain in the world?",
        answer: "Mount Everest",
        options: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 6",
        questionText: "Who painted the Sistine Chapel ceiling?",
        answer: "Michelangelo",
        options: ["Leonardo da Vinci", "Raphael", "Michelangelo", "Titian"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 7",
        questionText: "What is the largest ocean on Earth?",
        answer: "Pacific Ocean",
        options: [
          "Atlantic Ocean",
          "Indian Ocean",
          "Arctic Ocean",
          "Pacific Ocean",
        ],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 8",
        questionText: "Who is known as the father of modern physics?",
        answer: "Albert Einstein",
        options: [
          "Isaac Newton",
          "Albert Einstein",
          "Galileo Galilei",
          "Nikola Tesla",
        ],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 9",
        questionText: "What is the chemical symbol for gold?",
        answer: "Au",
        options: ["Ag", "Au", "Pt", "Pb"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 10",
        questionText: "Who wrote '1984'?",
        answer: "George Orwell",
        options: [
          "Aldous Huxley",
          "George Orwell",
          "Ray Bradbury",
          "J.R.R. Tolkien",
        ],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 11",
        questionText: "What is the chemical formula for table salt?",
        answer: "NaCl",
        options: ["NaCl", "H2O", "CO2", "NH3"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 12",
        questionText: "Who discovered penicillin?",
        answer: "Alexander Fleming",
        options: [
          "Marie Curie",
          "Louis Pasteur",
          "Alexander Fleming",
          "Robert Koch",
        ],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 13",
        questionText: "What is the chemical symbol for lead?",
        answer: "Pb",
        options: ["Pb", "Fe", "Cu", "Ag"],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 14",
        questionText: "Who was the first woman to win a Nobel Prize?",
        answer: "Marie Curie",
        options: [
          "Rosalind Franklin",
          "Marie Curie",
          "Dorothy Hodgkin",
          "Irene Joliot-Curie",
        ],
        ismcq: true,
      },
      {
        quizid: quizId,
        questionId: "Question 15",
        questionText: "What is the largest organ in the human body?",
        answer: "Skin",
        options: ["Liver", "Heart", "Brain", "Skin"],
        ismcq: true,
      },
    ];

    await Question.insertMany(questions);

    console.log("Quiz and questions created successfully.");
  } catch (err) {
    console.error("Error creating quiz and questions:", err);
  }
}

// createQuizWithQuestions();

async function insertFakeQuizzes() {
  try {
    const fakeQuizzes = [];

    // Generating 15 fake quizzes
    for (let i = 1; i <= 15; i++) {
      fakeQuizzes.push({
        quizname: `Quiz ${i}`,
        quizdescription: `Description for Quiz ${i}`,
        owner: `Owner ${i}`,
        owneremail: `owner${i}@example.com`,
        Questions: [], // Assuming no questions initially
      });
    }

    // Inserting fake quizzes into the database
    const insertedQuizzes = await Quiz.insertMany(fakeQuizzes);

    console.log("Fake quizzes inserted successfully:", insertedQuizzes);
  } catch (err) {
    console.error("Error inserting fake quizzes:", err);
  }
}

// Call the function to insert fake quizzes
// insertFakeQuizzes();

async function addFakeResultsForPresentQuizzes() {
  try {
    // Assuming you have an array of present quiz IDs
    const presentQuizIds = ["quiz1", "quiz2", "quiz3"]; // Replace with actual present quiz IDs

    // Generating 15 fake results for each present quiz
    for (let quizId of presentQuizIds) {
      for (let i = 1; i <= 15; i++) {
        const fakeResult = {
          quizid: quizId,
          studentid: `student${i}`,
          email: `student${i}@example.com`,
          marks: Math.floor(Math.random() * 101).toString(), // Random marks between 0 and 100
        };

        // Inserting fake result into the database
        await Result.create(fakeResult);
      }
    }

    console.log("Fake results added successfully.");
  } catch (err) {
    console.error("Error adding fake results:", err);
  }
}

// Call the function to add fake results
// addFakeResultsForPresentQuizzes();
