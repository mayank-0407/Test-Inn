import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function Uploadstudents() {
  const navigate = useNavigate();
  const [students, setSelectedFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
      } else {
        navigate("/");
      }
    };
    authenticate();
  }, []);
  async function handleUpload(e) {
    e.preventDefault();
    if (students) {
      const formData = new FormData();
      formData.append("students", students);

      axios
        .post(`http://localhost:4001/api/import/student/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("File uploaded successfully", response);
          toast.success("File uploaded successfully");
          const timeoutId = setTimeout(() => {
            navigate("/dashboard");
          }, 2000);
        })
        .catch((error) => {
          toast.error("Error uploading file");
          console.error("Error uploading file", error);
        });
    }
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <ToastContainer />
      <div className="pt-3 w-full max-w-md mx-auto">
        <form
          onSubmit={handleUpload}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200"
          >
          <p><b>Please read these instructions before uploading Students Data to avoid any type of confusion:</b></p>
            <p>1. Only CSV files are allowed. <a>Sample Excel File</a></p>
            <p>2. There could be multiple columns, there order does not matter, for example - consider columns A and B, A can be given in the column after or before B but inside A column, only A's entries should be there.</p>
            <p>3. If any duplicate entry is found, then first copy will be taken and rest will be dropped.</p>
            <p>4. Compulsory Columns are : Email and Name of students. Column Names should be in title case.</p>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="quizdes"
            >
              Upload CSV File:
            </label>
            <input
              type="file"
              accept=".csv"
              id="students"
              name="students"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Students"
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

export default Uploadstudents;
