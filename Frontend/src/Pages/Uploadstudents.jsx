import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin,isStudent, setAuthentication } from "../utils/auth";

function Uploadstudents() {
  const navigate = useNavigate();
  const [students, setSelectedFile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();

      if (loggedIn.auth) {
        const Isstudent = await isStudent(loggedIn.data.email);
        if (Isstudent) {
          navigate("/student/login");
        }
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
          if (response.status === 200) {
            console.log("File uploaded successfully", response);
            toast.success("File uploaded successfully");
            const timeoutId = setTimeout(() => {
              navigate("/dashboard");
            }, 2000);
            timeoutId();
          }
          if(response.status === 500){
            toast.error("Error while uploading students");
          }
        })
        .catch((error) => {
          // toast.error("Error uploading file");
          console.error("Error uploading file", error);
        });
    }
  }
  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };
  const [isMenuOpen, setMenuOpen] = useState(false);

  const handleSignOut = () => {
    logOut();
    toast.success("Logout Successfully");
    navigate("/");
  };

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
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
              Home
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
      <div className="pt-3 w-full max-w-md mx-auto">
        <form
          onSubmit={handleUpload}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200"
        >
          <p>
            <b>
              Please read these instructions before uploading Students Data to
              avoid any type of confusion:
            </b>
          </p>
          <p>
            - Make Sure you add Students after before taking quiz because there are chances that student is enrolled in another quiz.
          </p>
          <p>
            1. Only CSV files are allowed. <a>Sample Excel File</a>
          </p>
          <p>
            2. There could be multiple columns, there order does not matter, for
            example - consider columns A and B, A can be given in the column
            after or before B but inside A column, only A's entries should be
            there.
            <a
              className="text-gray-700 text-sm font-bold mb-2"
              href="https://docs.google.com/spreadsheets/d/1SvnsENUUOCeW7FwTcOQ6rtoXJZ8A2f4oNQb8JEWWE5g/edit?usp=sharing"
            >
              Download Sample
            </a>
            .
          </p>
          <p>
            3. If any duplicate entry is found, then first copy will be taken
            and rest will be dropped.
          </p>
          <p>
            4. Compulsory Columns are : Email and Name of students. Column Names
            should be in title case.
          </p>
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
