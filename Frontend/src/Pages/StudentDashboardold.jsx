import React, { useState, useEffect } from "react";
import NavbarStudent from "../components/NavbarStudent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { logOut } from "../utils/auth";

function Quiz() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [quizid, setQuizid] = useState("");
  const [studentid, setStudentId] = useState("");
  const [quiz, getQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [results, setResults] = useState([]);
  const [total, setTotal] = useState();
  var [thistotal, setThisTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const loggedIn = await isLogin();
      if (loggedIn.auth) {
        setQuizid(loggedIn.data.quizid);
        setStudentId(loggedIn.data.studentid);
        setUser(loggedIn.data);
        try {
          const checkResponse = await axios.get(
            `http://localhost:4001/quiz/student/${loggedIn.data.quizid}`
          );

          if (checkResponse.data[0].upload === false) {
            toast.error("Quiz Not Uploaded Yet");
            logOut();
            navigate("/student/login");
          } else {
            const response = await axios.get(
              `http://localhost:4001/quiz/student/show/${loggedIn.data.quizid}`
            );
            getQuiz(response.data);
          }
        } catch (error) {
          toast.error("Error");
          console.error("error while fetching quiz:", error);
        }
      }
    };
    fetchData();
  }, []);
  async function goToNextQuestion() {
    const currentQuestion = quiz[currentQuestionIndex];
    if (currentQuestion) {
      var temp = [];
      console.log("selectedOption:", selectedOption);
      typeof selectedOption;
      console.log("selectedAnswer:", currentQuestion.answer);
      var isCorrect = selectedOption === currentQuestion.answer;
      console.log(isCorrect);
      var counttotal = thistotal;
      if (isCorrect) {
        counttotal++;
        setThisTotal(counttotal);
        console.log(thistotal);
      }
    }
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      console.log(total);
      setSubmitted(true);
      console.log(studentid);
      try {
        const response = await axios.post("http://localhost:4001/quiz/submit", {
          studentid,
          quizid,
          thistotal,
        });
        toast.success("Quiz Submitted");
        const timeoutId = setTimeout(() => {
          navigate("/student/login");
        }, 3000);
      } catch (error) {
        toast.error("Unable To Subtmit");
        console.error("Reset error:", error);
      }
    }
  }

  function handleSubmitQuiz() {
    const currentQuestion = quiz[currentQuestionIndex];
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <NavbarStudent />
        <div className="text-center mt-8">
          <h1 className="text-3xl font-semibold">
            Thanks for giving the quiz!
          </h1>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz[currentQuestionIndex];

  if (!currentQuestion) {
    return <div>No questions available</div>;
  }
  const totalCorrectAnswers = results.filter(
    (result) => result === true
  ).length;

  return (
    <div>
      <NavbarStudent />
      <div className="flex justify-between items-center ml-7 mr-12">
        <div className="p-4 text-2xl font-semibold text-left">
          Give Your Best for the Quiz!!
        </div>
      </div>
      <div className="container mx-auto mt-6 grid grid-rows-1 sm:grid-rows-2 lg:grid-rows-3 gap-4">
        <div
          key={currentQuestion.questionId}
          className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-700"
        >
          <form>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {currentQuestion.questionText}
              </h3>
              {currentQuestion.options.map((option) => (
                <div key={option}>
                  <label>
                    <input
                      type="radio"
                      name={`question_${currentQuestion.questionId}`}
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => setSelectedOption(option)}
                    />
                    {option}
                  </label>
                </div>
              ))}
            </div>
            {currentQuestionIndex < quiz.length - 1 && (
              <button
                type="button"
                onClick={goToNextQuestion}
                className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-700 mt-4 float-right"
              >
                Next
              </button>
            )}
            {currentQuestionIndex === quiz.length - 1 && (
              <button
                type="button"
                onClick={goToNextQuestion}
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover-bg-green-700 mt-4 float-right"
              >
                Submit Quiz
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
