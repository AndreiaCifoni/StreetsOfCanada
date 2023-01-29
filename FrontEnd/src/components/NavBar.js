import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

const NavBar = ({ onLogout, userStatus }) => {
  return (
    <div className=" bg-indigo-300 h-20 shadow-md flex justify-between font-bold text-purple-900">
      <h1 className="my-auto ml-8 text-3xl lg:text-2xl ">Streets Of Canada</h1>
      <div className="flex justify-end my-auto mr-8">
        <Link
          className="text-2xl lg:text-lg py-2 px-3 mx-4 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-2xl lg:text-lg py-2 px-3 mx-4 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
          to="/activity"
        >
          New Activity
        </Link>

        {userStatus === null ? (
          <div className="flex justify-between">
            <Link
              className="text-2xl lg:text-lg py-2 px-3 mx-4 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="text-2xl lg:text-lg py-2 px-3 mx-4 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
              to="/register"
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex justify-between">
            <Link
              className="text-2xl lg:text-lg py-2 px-3 mx-4 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
              to="/"
              onClick={onLogout}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;

//alert("Hi there, login to add a new activity");
