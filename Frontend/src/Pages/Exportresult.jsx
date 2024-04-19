import React, { useEffect } from "react";
import Navbarviewquiz from "../components/Navbarviewquiz";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, isStudent } from "../utils/auth";
import { saveAs } from 'file-saver';

function Exportresult() {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const loggedIn = await isLogin();
        if (!loggedIn.auth) {
          navigate("/");
          return;
        }

        const Isstudent = await isStudent(loggedIn.data.email);
        if (Isstudent) {
          navigate("/student/login");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:4001/quiz/get/result/${id}`,
          { responseType: "blob" }
        );

        if (response.status === 200) {
          const blob = new Blob([response.data], { type: "text/csv" });
          saveAs(blob, "result.csv");
          toast.success("Result Downloaded Successfully");
          var timeoutId = setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        } else {
          toast.error("Failed to download result");
        }
      } catch (error) {
        console.error("Error while fetching result:", error);
        toast.error("Error");
      }
    };

    fetchData();
  }, [id, navigate]);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbarviewquiz />
      <ToastContainer />
    </div>
  );
}

export default Exportresult;
