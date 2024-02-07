import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const [quiz, getQuiz] = useState([]);

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        toast.success("Welcome To Dashboard");
        try {
          const response = await axios.get(
            `http://localhost:4001/quiz/${loggedIn.data._id}`
          );
          if (response.status === 200) {
            console.log("thisquiz", response.data[0].upload);
            console.log(response.data);
            getQuiz(response.data);
          } else {
            console.log("thisquiz", response.data[0].upload);
            console.log(response.data);
            toast.error("No Quiz Added Yet!");
          }
        } catch (error) {
          // toast.error("Error");
          console.error("error while fetching quiz:", error);
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
          Hi {user.name}, Welcome to Your Dashboard!
        </div>
        <div className="flex space-x-4">
          <Link
            to={`/dashboard/create/quiz`}
            className="bg-blue-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Create Quiz
          </Link>
        </div>
      </div>
      <div className="container mx-auto mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {quiz.map((thisquiz) => (
          <div
            key={thisquiz._id}
            className="rounded-lg overflow-hidden shadow-lg bg-white dark:bg-neutral-700"
          >
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">
                {thisquiz.quizname}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                QuizID - {thisquiz._id}
              </p>
              <p className="text-gray-600 dark:text-gray-400 inline-flex">
                Uploaded - {thisquiz.upload && <p>True </p>}
                (Make Quiz Online)
              </p>
              <p className="text-gray-600 dark:text-gray-400">
                {thisquiz.description}
              </p>
            </div>
            <div className="p-4 bg-white dark:bg-neutral-800">
              <div className="flex justify-between">
                <Link
                  to={`/quiz/view/${thisquiz._id}`}
                  className="block text-center bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition duration-300 mx-2"
                >
                  View
                </Link>
                <Link
                  to={`/quiz/upload/${thisquiz._id}`}
                  className="block text-center bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300 mx-2"
                >
                  Upload
                </Link>
                <Link
                  to={`/quiz/delete/${thisquiz._id}`}
                  className="block text-center bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-700 transition duration-300 mx-2"
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

export default Dashboard;
