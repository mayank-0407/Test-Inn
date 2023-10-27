import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin, setAuthentication } from "../utils/auth";

function Reset() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleReset(e) {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4001/api/reset", {
        email,
      });
      toast.success("Link Sent to Mail Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error");
      console.error("Reset error:", error);
    }
  }

  useEffect(() => {
    const authenticate = async () => {
      const loggedIn = await isLogin();
      console.log(loggedIn);

      if (loggedIn.auth) {
        navigate("/Dashboard");
      }
    };
    authenticate();
  }, []);

  return (
    <div className="">
      <ToastContainer />
      <div className="p-4 font-bold text-2xl ">TestInn</div>
      <div className="p-4 font-bold text-2xl ">Reset</div>

      <div className="pt-3 w-full max-w-md mx-auto">
        <form
          onSubmit={handleReset}
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
          <div className="flex items-center justify-between ml-40">
            <button type="submit" className="bg-blue-600 rounded p-2">
              Confirm Reset
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
export default Reset;
