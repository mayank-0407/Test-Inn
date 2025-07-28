import React, { useState, useEffect } from "react";
import NavbarStudent from "../components/NavbarStudent";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { logOut, quizGiven, isLogin } from "../utils/auth";

function Quiz() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [quizid, setQuizid] = useState("");
  const [studentid, setStudentId] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [total, setTotal] = useState(0);
  const [quizGivenAlready, setquizGivenAlready] = useState(false);

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
            const alreadyGiven = await quizGiven(loggedIn.data.email);
            if (alreadyGiven) {
              setquizGivenAlready(true);
            }
            const response = await axios.get(
              `http://localhost:4001/quiz/student/show/${loggedIn.data.quizid}`
            );
            setQuiz(response.data);
          }
        } catch (error) {
          toast.error("Error");
          console.error("error while fetching quiz:", error);
        }
      }
    };
    fetchData();
  }, []);

  if (quizGivenAlready) {
    return (
      <div>
        <NavbarStudent />
        <div className="text-center mt-8">
          <h1 className="text-3xl font-semibold">
            You have already Submitted the Quiz!
          </h1>
        </div>
      </div>
    );
  }

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const goToNextQuestion = async () => {

    const currentQuestion = quiz[currentQuestionIndex];

    if (!selectedOption || selectedOption.trim() === "") {
      toast.warning("Please select or enter an answer before proceeding.");
      return;
    }

    const isCorrect = currentQuestion.ismcq
      ? selectedOption === currentQuestion.answer
      : selectedOption.trim().toLowerCase() ===
        currentQuestion.answer.trim().toLowerCase();

    if (isCorrect) {
      setTotal(total + 1);
    }

    setSelectedOption(null);

    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      try {
        await axios.post("http://localhost:4001/quiz/submit", {
          studentid,
          quizid,
          total,
        });
        toast.success("Quiz Submitted");
        setSubmitted(true);
        const timeoutId = setTimeout(() => {
          navigate("/student/login");
        }, 3000);
      } catch (error) {
        toast.error("Unable To Submit");
        console.error("Submit error:", error);
      }
    }
  };

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

  return (
    <div>
      <NavbarStudent />
      <div className="flex justify-between items-center p-4">
        <h2 className="text-2xl font-semibold">
          Give Your Best for the Quiz!!
        </h2>
        <div>
          {currentQuestionIndex + 1}/{quiz.length}
        </div>
      </div>
      <div className="container mx-auto mt-6">
        <div className="rounded-lg overflow-hidden shadow-lg bg-white p-4">
          <h3 className="text-xl font-semibold mb-4">
            {currentQuestion.questionText}
          </h3>
          <form>
            {currentQuestion.ismcq ? (
              currentQuestion.options.map((option, index) => (
                <div key={index} className="mb-2">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      name={`question_${currentQuestion.questionId}`}
                      id={`${currentQuestion.questionId}`}
                      value={option}
                      checked={selectedOption === option}
                      onChange={() => handleOptionChange(option)}
                    />
                    <span className="ml-2">{option}</span>
                  </label>
                </div>
              ))
            ) : (
              <div className="mb-4">
                <input
                  type="text"
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Type your answer here..."
                  value={selectedOption || ""}
                  onChange={(e) => handleOptionChange(e.target.value)}
                />
              </div>
            )}
            <button
              type="button"
              onClick={goToNextQuestion}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 mt-4 float-right"
            >
              {currentQuestionIndex === quiz.length - 1
                ? "Submit Quiz"
                : "Next"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
