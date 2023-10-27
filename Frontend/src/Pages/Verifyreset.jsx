import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { isLogin, setAuthentication } from "../utils/auth";

const saltRounds = 10;

function Verifyreset() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4001/api/reset/${id}`
        );
        console.log(response.data); // Log the response data, not user
        setUser(response.data);
        setEmail(response.data.email);
      } catch (error) {
        toast.error("Error");
        console.error("Sign-in error:", error);
      }
    };

    fetchData(); // Call the async function to fetch the data
  }, [id]);

  async function handleReset(e) {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:4001/api/reset/${id}/submit`, {
        email,
        password,
      });
      console.log("Reset result:", response);
      toast.success("Account Password Changed Successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error");
      console.error("Sign-in error:", error);
    }
  }

  return (
    <div className="">
      <ToastContainer />
      <ToastContainer />
      <div className="p-4 font-bold text-2xl ">Reset Password</div>

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
              value={user.email}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter Email"
              disabled
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="Pass1"
            >
              New Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Enter New Password"
            />
          </div>
          <div className="flex items-center justify-between ml-40">
            <button type="submit" className="bg-blue-600 rounded p-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Verifyreset;
