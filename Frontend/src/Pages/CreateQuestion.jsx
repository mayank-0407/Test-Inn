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
  const [quizid, setQuizid] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [answer, setAnswer] = useState("");
  const [options, setOptions] = useState([]);
  const { id } = useParams();
  let timeoutId;

  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOut();
    toast.success("Logout Successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        setQuizid(id);
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);

  async function handleQuizCreate(e) {
    e.preventDefault();

    if (questionText.trim().length === 0) {
      toast.error("Question Con not be empty!");
      return;
    }
    if (answer.trim().length === 0) {
      toast.error("Answer of the question Con not be empty!");
      return;
    }
    if (options.length !== 4) {
      toast.error("The question's options must have 4 options!");
      return;
    }
    if (options.map((opt) => opt.trim()).some((opt) => opt.length === 0)) {
      toast.error(
        "There must be options for the question. Options cannot be empty!"
      );
      return;
    } else if (!options.includes(answer)) {
      toast.error("Options must include the answer for the question!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:4001/quiz/question/create",
        {
          quizid,
          questionText,
          answer,
          options,
        }
      );
      if (response.status === 200) {
        toast.success("Question Added Successfully");
        timeoutId = setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else if (response.status === 203) {
        toast.error("Error: Your Options must include the Answer!");
      }
    } catch (error) {
      toast.error("Error");
      console.error("Reset error:", error);
    }
  }

  const handleTextareaChange = (e) => {
    const inputText = e.target.value;
    const optionsArray = inputText.split(",").map((option) => option.trim());
    setOptions(optionsArray);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-blue-500">
        <nav className="flex justify-between items-center px-4 py-4 bg-white">
          <Link to="/dashboard" className="text-3xl font-bold leading-none">
            <img src="/TestInn.png" alt="Test-Inn Logo" className="h-16 px-4" />
          </Link>
          <div className="lg:hidden">
            <button
              className="navbar-burger flex items-center text-blue-600 p-3"
              onClick={toggleMenu}
            >
              <svg
                className="h-4 w-4 fill-current"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard" className="btn-blue">
              Dashboard
            </Link>
            <a
              className="hidden lg:inline-block py-2 px-6 bg-blue-500 hover:bg-blue-600 text-sm text-white font-bold rounded-full transition duration-200"
              href="#"
              onClick={handleSignOut}
            >
              Logout
            </a>
          </div>
        </nav>
      </div>

      <div
        className={`navbar-menu fixed inset-0 ${isMenuOpen ? "" : "hidden"}`}
      >
        <div
          className="navbar-backdrop fixed inset-0 bg-gray-800 opacity-25"
          onClick={toggleMenu}
        ></div>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <a className="mr-auto text-3xl font-bold leading-none" href="#">
              <img
                src="/TestInn.png"
                alt="Test-Inn Logo"
                className="h-16 px-4"
              />
            </a>
            <button className="navbar-close" onClick={toggleMenu}>
              <svg
                className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
          <div className="mt-auto">
            <div className="pt-6">
              <Link to="/dashboard" className="btn-blue">
                Dashboard
              </Link>
              <a
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-blue-500 hover:bg-blue-600 rounded-full"
                href="#"
                onClick={handleSignOut}
              >
                Logout
              </a>
            </div>
          </div>
        </nav>
      </div>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen">
        <div className="w-full max-w-md mx-auto">
          <form
            onSubmit={handleQuizCreate}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200"
          >
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Add A MCQ Question
            </h2>
            <div className="mb-4">
              <label
                htmlFor="questionText"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Question Text:
              </label>
              <input
                type="text"
                id="questionText"
                name="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Question"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="answer"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Question Answer:
              </label>
              <input
                type="text"
                id="answer"
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Question Answer"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="options"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Question Options (comma-separated):
              </label>
              <textarea
                id="options"
                name="options"
                value={options.join(", ")}
                onChange={handleTextareaChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter Question Options (comma-separated)"
              />
            </div>
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-full px-6 py-3 hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateQuestion;
