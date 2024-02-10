import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin } from "../utils/auth";
import Navbar from "../components/Navbar";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        toast.success("Welcome To Dashboard");

        try {
          const response = await axios.get(
            `http://localhost:4001/quiz/${loggedIn.data._id}`
          );

          if (response.status === 200) {
            setQuiz(response.data);
          } else {
            toast.error("No Quiz Added Yet!");
          }
        } catch (error) {
          console.error("Error while fetching quiz:", error);
        }
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);

  async function handleDeleteQuiz(quizId) {
    try {
      await axios.delete(`http://localhost:4001/quiz/delete/${quizId}`);
      const updatedQuiz = quiz.filter((q) => q._id !== quizId);
      setQuiz(updatedQuiz);
      toast.success("Quiz deleted successfully");
    } catch (error) {
      toast.error("Error deleting quiz");
      console.error("Error deleting quiz:", error);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ToastContainer />

      <div className="flex justify-between items-center ml-7 mr-12 mt-6">
        <div className="p-4 text-2xl font-semibold">
          Hi {user.name}, Welcome to Your Dashboard!
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {quiz.map((thisquiz) => (
          <div
            key={thisquiz._id}
            className="relative rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-700"
          >
            {thisquiz.upload ? (
              <></>
            ) : (
              <Link
                to={`/quiz/upload/${thisquiz._id}`}
                className="btn-purple absolute top-2 right-8 p-2"
              >
                Upload
              </Link>
            )}
            <Link
              to={`/quiz/view/${thisquiz._id}`}
              className="absolute top-2 right-2 p-2 btn-red"
            >
              X
            </Link>
            <div className="p-4">
              <Link to={`/quiz/view/${thisquiz._id}`} className="btn-purple">
                <h3 className="text-xl font-semibold mb-2">
                  {thisquiz.quizname}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  QuizID - {thisquiz._id}
                </p>
                {thisquiz.upload ? (
                  <p className="text-gray-600 dark:text-gray-400 inline-flex">
                    Uploaded - This Quiz is available to Students!
                  </p>
                ) : (
                  <></>
                )}
                <p className="text-gray-600 dark:text-gray-400">
                  {thisquiz.description}
                </p>
              </Link>
            </div>

            {/* <div className="p-4 bg-white dark:bg-neutral-800">
              <div className="absolute bottom-2 right-2 p-2">
                <Link
                  to={`/quiz/upload/${thisquiz._id}`}
                  className="btn-green "
                >
                  Make Quiz Live
                </Link>
              </div>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
