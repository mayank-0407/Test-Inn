import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function CreateQuestion() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ _id: "", name: "", email: "" });
  // const [ownerid, setOwnerid] = useState("");
  // const [owneremail, setOwneremail] = useState("");
  const [quizid, setOuizid] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const { id } = useParams();
  let timeoutId;
  

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        setOuizid(id);
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);
  async function handleQuizCreate(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/quiz/question/create", {
        quizid,
        questionText,
        answer,
        options,
      });
      toast.success("Question Added Successfully");
      timeoutId = setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
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
              htmlFor="questionText"
            >
              Question Test:
            </label>
            <input
              type="text"
              id="questionText"
              name="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Question"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="answer"
            >
              Question Answer:
            </label>
            <input
              type="text"
              id="answer"
              name="answer"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Question Answer"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="options"
            >
              Question Options (comma-separated):
            </label>
            <textarea
              id="options"
              name="options"
              value={options.join(", ")} // Convert the array to a comma-separated string
              onChange={(e) => setOptions(e.target.value.split(", "))} // Split the input string into an array
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Question Options (comma-separated)"
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

export default CreateQuestion;
