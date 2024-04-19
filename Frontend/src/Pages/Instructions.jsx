import React, { useState, useEffect } from "react";
import NavbarStudent from "../components/NavbarStudent";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication, logOut } from "../utils/auth";

function Instructions() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        const checkResponse = await axios.get(
          `http://localhost:4001/quiz/student/${loggedIn.data.quizid}`
        );

        if (checkResponse.data[0].upload === false) {
          toast.error("Quiz Not Uploaded Yet");
          logOut();
          navigate("/student/login");
        } else {
          setUser(loggedIn.data);
          navigate("/student/instructions");
        }
      } else {
        navigate("/student/login");
      }
    };
    authenticate();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarStudent />
      <ToastContainer />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-2/3">
          <h1 className="text-3xl font-semibold text-center mb-6">
            Quiz Instructions
          </h1>
          <p className="text-lg mb-4">
            <strong>Duration:</strong> This quiz has a total duration of (Number
            of Questions ) * 1 minute.
          </p>
          <p className="text-lg mb-4">
            <strong>Questions:</strong> There are Single-choice questions. Read
            each question carefully before selecting your answer.
          </p>
          <p className="text-lg mb-4">
            <strong>Answers:</strong> Mark your answers by clicking on the radio
            button next to your choice. You must mark your answer within 1
            minute; otherwise, you will miss that question.
          </p>
          <p className="text-lg mb-4">
            <strong>Scoring:</strong> Each correct answer will earn you one
            point. There is no penalty for wrong answers.
          </p>
          <p className="text-lg mb-4">
            <strong>Navigation:</strong> You can move to the next question by
            clicking the "Next" button. Please use this button only when you are
            ready to proceed to the next question.
          </p>
          <p className="text-lg mb-4">
            <strong>Submitting:</strong> The quiz will end automatically after
            (Number of Questions ) * 1 minute. If you've marked answers to all
            the questions before the time is up, if you ended early than you
            need to submit . Your score will be calculated based on the marked
            answers.
          </p>
          <p className="text-lg mb-4">
            <strong>Enjoy:</strong> Take a deep breath, stay focused, and enjoy
            the quiz!
          </p>
          <div className="flex justify-end">
            <Link
              to="/student/quiz"
              // onClick={onStartQuiz}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover-bg-blue-700"
            >
              Start Quiz
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Instructions;
