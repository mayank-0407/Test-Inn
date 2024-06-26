import React, { useState, useEffect } from "react";
import Navbarviewquiz from "../components/Navbarviewquiz";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, isStudent, setAuthentication } from "../utils/auth";

function DeleteStudent() {
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
          const response = await axios.post(
            `http://localhost:4001/quiz/student/deletes/${id}`
          );
          if (response.status === 200) {
            toast.success("The Student is deleted Successfully");
            timeoutId = setTimeout(() => {
              navigate(`/dashboard`);
            }, 1000);
            timeoutId();
          } else {
            toast.error("Error while deleting Student");
          }
        } catch (error) {
          // toast.error("Error11");
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
      <ToastContainer />
    </div>
  );
}

export default DeleteStudent;
