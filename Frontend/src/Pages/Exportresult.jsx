import React, { useState, useEffect } from "react";
import Navbarviewquiz from "../components/Navbarviewquiz";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, isStudent, setAuthentication } from "../utils/auth";

function Exportresult() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "", email: "" });
  const { id } = useParams();

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
            `http://127.0.0.1:4001/quiz/get/result/${id}`
          );
          toast.success("Result Downloaded Successfully");
          timeoutId = setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } catch (error) {
          toast.error("Error");
          console.error("error while fetching Result:", error);
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

export default Exportresult;
