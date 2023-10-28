import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
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
      console.log(loggedIn);

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        console.log(user._id);
        setOwnerid(user._id);
        setOwneremail(user.email);
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);
  const timeoutId = setTimeout(() => {}, 5000); // 5000 milliseconds = 5 seconds
  async function handleQuizCreate(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/quiz/create", {
        quizname,
        quizdescription,
        ownerid,
        owneremail,
      });
      toast.success("Quiz Created Successfully");
      timeoutId();

      navigate("/dashboard");
    } catch (error) {
      toast.error("Error");
      console.error("Reset error:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ToastContainer />
      <div className="pt-3 w-full max-w-md mx-auto">
        <form
          onSubmit={handleQuizCreate}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quizname"
            >
              Quiz Name:
            </label>
            <input
              type="text"
              id="quizname"
              name="quizname"
              value={quizname}
              onChange={(e) => setQuizName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Quiz Name"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quizdes"
            >
              Quiz Description:
            </label>
            <input
              type="text"
              id="quizdescription"
              name="quizdescription"
              value={quizdescription}
              onChange={(e) => setQuizDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Quiz Description"
            />
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded p-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateQuiz;
