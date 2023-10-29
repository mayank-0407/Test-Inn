import React, { useState, useEffect } from "react";
import Navbarviewquiz from "../components/Navbarviewquiz";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function UploadQuiz() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const { id } = useParams();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        setUser(loggedIn.data);
        try {
          const response = await axios.post(
            `http://localhost:4001/quiz/upload/${id}`
          );
          toast.success("Question Uploaded Successfully");
          timeoutId = setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
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
      <Navbarviewquiz />
      <ToastContainer />
    </div>
  );
}

export default UploadQuiz;
