import React, { useState, useEffect } from "react";
import NavbarViewQuizTeacher from "../components/NavbarViewQuizTeacher";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, isStudent, setAuthentication } from "../utils/auth";

function Viewquestion() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [questions, setQuestions] = useState([]);
  const { id } = useParams();
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
        const Isstudent = await isStudent(loggedIn.data.email);
        if (Isstudent) {
          navigate("/student/login");
        }
        try {
          const response = await axios.get(
            `http://localhost:4001/quiz/question/${id}`
          );
          setQuestions(response.data);
        } catch (error) {
          toast.error("Error while fetching questions");
          console.error("Error fetching questions:", error);
        }
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);

  async function handleDeleteQuestion(questionId) {
    try {
      await axios.delete(`http://localhost:4001/question/delete/${questionId}`);
      const updatedQuestions = questions.filter(
        (question) => question._id !== questionId
      );
      setQuestions(updatedQuestions);
      toast.success("Question deleted successfully");
    } catch (error) {
      toast.error("Error deleting question");
      console.error("Error deleting question:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* <NavbarViewQuizTeacher /> */}
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
              Home
            </Link>
            <Link to={`/quiz/add/students/${id}`} className="btn-blue">
              Add Students
            </Link>
            <Link to={`/quiz/upload/students/${id}`} className="btn-blue">
              Upload Students
            </Link>
            <Link to={`/quiz/student/view/${id}`} className="btn-blue">
              All Students
            </Link>
            <Link to={`/export/result/${id}`} className="btn-purple">
              Download Result
            </Link>
            <Link to={`/question/create/${id}`} className="btn-red">
              Add MCQ
            </Link>
            <Link to={`/question/create/fillup/${id}`} className="btn-red">
              Add FillUp
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
              <Link
                to="/dashboard"
                className="block px-4 py-3 mb-2 leading-loose text-xs text-center text-white font-semibold bg-green-500 hover:bg-green-600 rounded-full"
              >
                Home
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
      <div className="flex justify-between items-center mx-7 my-4">
        <div className="text-2xl font-semibold">All Questions</div>
      </div>
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {questions.map((question) => (
          <div
            key={question.questionId}
            className="relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-700"
          >
            <Link
              to={`/question/delete/${question._id}`}
              className="absolute top-2 right-2 p-2 text-black  hover:text-red-700"
            >
              X
            </Link>
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                QuizID - {question.questionId}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Question - {question.questionText}
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                Answer - {question.answer}
              </p>
              {question.ismcq ? (
                <p className="text-gray-600 dark:text-gray-400">
                  Options - {question.options.map((option) => option + ", ")}
                </p>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewquestion;
