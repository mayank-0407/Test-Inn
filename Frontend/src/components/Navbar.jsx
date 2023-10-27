import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLogin, logOut } from "../utils/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Navbar() {
  const isUserSignedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSignOut = () => {
    logOut();
    toast.success("Logout Successfully");
    navigate("/");
  };
  return (
    <div className="">
      <div className="flex justify-between">
        <div className="p-4 font-bold text-2xl">
          <h1>TestInn</h1>
        </div>
        <div className="">
          <button className="bg-red-400 rounded text-white bold p-2 " onClick={handleSignOut}>Sign Out</button>
        </div>
      </div>
        <hr />
    </div>
  );
}

export default Navbar;
