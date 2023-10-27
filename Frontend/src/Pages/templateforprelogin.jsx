import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { isLogin,setAuthentication } from "../utils/auth";

function Dashboard() {
  const navigate = useNavigate();

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
      <Navbar />
      <ToastContainer />
      <div className="p-4 font-bold text-2xl ">Dashboard</div>
    </div>
  );
}
export default Dashboard;
