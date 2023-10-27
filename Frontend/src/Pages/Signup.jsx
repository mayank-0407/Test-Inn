import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { isLogin,setAuthentication } from "../utils/auth";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/signup", {
        name,
        email,
        password,
      });
      toast.success("Account Created Successfully");
      console.log("Sign-up result:", response);
      navigate('/')
    } catch (error) {
        toast.error("Error");
        console.error("Sign-up error:", error);
    }
  }

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        navigate('/Dashboard')
    }
    };
    authenticate();
  }, []);

  return (
    <div className="">
      <ToastContainer />
      <div className="p-4 font-bold text-2xl ">Signup</div>

      <div className="pt-3 w-full max-w-md mx-auto">
        <form
            onSubmit={handleSignup}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-200"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="name"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter your name"
            />
          </div>
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
              Signup
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
          Login
        </button>
      </div>
    </div>
  );
}
export default Signup;
