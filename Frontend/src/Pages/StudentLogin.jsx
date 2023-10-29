import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";
import NavbarStudent from "../components/NavbarStudent";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4001/api/student/login",
        {
          username,
          password,
        }
      );
      console.log("Sign-in result:", response);
      toast.success("Account logged in Successfully");
      console.log(response.data.token);
      setAuthentication(response.data.token);
      navigate("/student/instructions");
    } catch (error) {
      toast.error("Error");
      console.error("Sign-in error:", error);
    }
  }

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        navigate("/student/instructions");
      } else {
        navigate("/student/login");
      }
    };

    authenticate();
  }, []);

  // ...

  return (
    <div>
      <NavbarStudent />
      <ToastContainer />
      <div className="flex justify-center items-center h-screen">
        <div className="max-w-md w-full">
          <div className="text-3xl font-bold mb-4 text-center">Login</div>

          <form
            onSubmit={handleSignup}
            className="bg-white border-4 border-blue-150 shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="username"
              >
                Username:
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-600 rounded p-2 w-full text-white"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
