import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLogin,setAuthentication } from "../utils/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/login", {
        email,
        password,
      });
      console.log("Sign-in result:", response);
      toast.success("Account logged in Successfully");
      console.log(response.data.token);
      setAuthentication(response.data.token);
      navigate('/dashboard');
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
        navigate('/Dashboard')
    } else {
        navigate("/");
      }
    };

    authenticate();
  }, []);

  return (
    <div className="">
      <ToastContainer />
      <div className="p-4 font-bold text-2xl ">Login</div>

      <div className="pt-3 w-full max-w-md mx-auto">
        <form
          onSubmit={handleSignup}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Pass1"
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
          <div className="flex items-center justify-between ml-40">
            <button type="submit" className="bg-blue-600 rounded p-2">
              Login
            </button>
          </div>
        </form>
        <button
          type="submit"
          className="bg-blue-600 rounded p-2"
          onClick={() => {
            navigate("/");
          }}
        >
          Signup
        </button>
        <button
          type="submit"
          className="bg-blue-600 rounded p-2 ml-5"
          onClick={() => {
            navigate("/reset");
          }}
        >
          Forgot
        </button>
      </div>
    </div>
  );
}
export default Login;
