import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function Viewquestion() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [question, getQuestion] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        try {
          const response = await axios.get(
            `http://localhost:4001/quiz/question/${id}`
          );
          console.log(response); // Log the response data, not user
          getQuestion(response.data);
        } catch (error) {
          toast.error("Error");
          console.error("error while fetching question:", error);
        }
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ToastContainer />
      <div className="flex justify-between items-center ml-7 mr-12">
        <div className="p-4 text-2xl font-semibold text-left">
          All Questions
        </div>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload Quiz
          </button>
          <Link to={`/question/create/${id}`} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            Add Question
          </Link>
        </div>
      </div>
      <div className="container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {question.map((thisquestion) => (
          <div
            key={thisquestion.quizid}
            className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-700"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {thisquestion.questionId}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {thisquestion.questionText}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {thisquestion.answer}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {thisquestion.options}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-neutral-800">
              <div className="flex justify-end">
                {/* <Link
                  to={`/question/${thisquestion._id}`}
                  className="text-center bg-purple-500 text-white py-2 w-1/2 rounded-md hover:bg-purple-700 transition duration-300"
                >
                  View
                </Link> */}
                <Link
                  to={`/question/delete/${thisquestion._id}`}
                  className="text-center bg-red-500 text-white py-2 w-1/2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Delete
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewquestion;
