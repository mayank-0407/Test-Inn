import React, { useState, useEffect } from "react";
import NavbarStudent from "../components/NavbarStudent";

function Quiz() {
  // const questions = [
  //   {
  //     id: 1,
  //     question: "What is the capital of France?",
  //     options: ["Paris", "Berlin", "Madrid"],
  //     correctAnswer: "Paris",
  //   },
  // ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [remainingTime, setRemainingTime] = useState(60); // 1 minute in seconds
  const [user, setUser] = useState({ name: "", email: "" });
  const [quizid, setQuizid] = useState("");
  const [questions, getQuiz] = useState("");

  const handleAnswerClick = (selectedAnswer) => {
    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setRemainingTime(60); // Reset the timer for the next question
    } else {
      setShowScore(true);
    }
  };

  let timer;
    useEffect(() => {
      const authenticate = async () => {
        const loggedIn = await isLogin();
        console.log(loggedIn);
        setQuizid(loggedIn.quizid);
        console.log(loggedIn.quizid);
  
        if (loggedIn.auth) {
          setUser(loggedIn.data);
          toast.success("Welcome To Dashboard");
          try {
            const response = await axios.get(
              `http://localhost:4001/quiz/student/show/${loggedIn.quizid}`
            );
            console.log(response.data);
            getQuiz(response.data);
          } catch (error) {
            toast.error("Error");
            console.error("error while fetching quiz:", error);
          }
        } else {
          navigate("/student/login");
        }
      };
      authenticate();
    }, []);

  return (
    <div>
      <NavbarStudent />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-2/3 relative">
          <div className="absolute top-2 right-4">
            <div className="w-12 h-12 rounded-full bg-blue-500 text-white text-2xl flex items-center justify-center">
              {Math.floor(remainingTime / 60)}:
              {(remainingTime % 60).toLocaleString("en-US", {
                minimumIntegerDigits: 2,
              })}
            </div>
          </div>
          <h1 className="text-3xl font-semibold text-center mb-6">TestInn</h1>
          {showScore ? (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Quiz Has Successfully been Submitted!
              </h2>
              {/* <p className="text-xl">
                Your Score: {score} out of {questions.length}
              </p> */}
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-semibold mb-4">
                Question {currentQuestion + 1}:
              </h2>
              <p className="text-lg mb-6">
                {questions[currentQuestion].questionText}
              </p>
              {questions[currentQuestion].options.map((option, index) => (
                <div key={index} className="mb-2">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="answer"
                      value={option}
                      onClick={() => handleAnswerClick(option)}
                      className="mr-2"
                    />
                    {option}
                  </label>
                </div>
              ))}
              <div className="flex justify-end">
                <button
                  onClick={handleNextQuestion}
                  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-700 mt-4"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
