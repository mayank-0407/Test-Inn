import React, { useState, useEffect } from "react";
import NavbarCreateQuiz from "../components/NavbarCreateQuiz";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function CreateQuiz() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ _id: "", name: "", email: "" });
  const [quizname, setQuizName] = useState("");
  const [quizdescription, setQuizDescription] = useState("");
  const [ownerid, setOwnerid] = useState("");
  const [owneremail, setOwneremail] = useState("");

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        setOwnerid(loggedIn.data._id);
        setOwneremail(loggedIn.data.email);
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);

  async function handleQuizCreate(e) {
    e.preventDefault();
    try {

      if (quizname.trim().length === 0) {
        toast.error("Quiz Name Con not be empty!");
        return;
      }
      if (quizdescription.trim().length === 0) {
        toast.error("Quiz Description Con not be empty!");
        return;
      }
      const response = await axios.post("http://localhost:4001/quiz/create", {
        quizname,
        quizdescription,
        ownerid,
        owneremail,
      });
      toast.success("Quiz Created Successfully");
      const timeoutId = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    } catch (error) {
      toast.error("Error");
      console.error("Reset error:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <NavbarCreateQuiz />
      <ToastContainer />
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">Create a Quiz</h2>
          <form onSubmit={handleQuizCreate}>
            <div className="mb-4">
              <label
                htmlFor="quizname"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Quiz Name:
              </label>
              <input
                type="text"
                id="quizname"
                name="quizname"
                value={quizname}
                onChange={(e) => setQuizName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quiz Name"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="quizdescription"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Quiz Description:
              </label>
              <input
                type="text"
                id="quizdescription"
                name="quizdescription"
                value={quizdescription}
                onChange={(e) => setQuizDescription(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Quiz Description"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Create Quiz
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateQuiz;
