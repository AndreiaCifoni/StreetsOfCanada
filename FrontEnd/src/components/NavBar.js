import React from "react";
import { Link } from "react-router-dom";
import { XCircleIcon, Bars3Icon } from "@heroicons/react/20/solid";
import "../index.css";

const NavBar = ({ onLogout, userStatus, onNavDropdown, navDropdown }) => {
  return (
    <nav className="nav-container bg-indigo-300 h-20 shadow-md flex justify-between font-bold text-purple-900">
      <h1 className="my-auto ml-8 xs:ml-2 text-3xl lg:text-2xl xs:text-lg ">
        Streets Of Canada
      </h1>

      <div className="nav-icon-container">
        <i onClick={onNavDropdown}>
          {navDropdown ? (
            <XCircleIcon className="nav-icon" />
          ) : (
            <Bars3Icon className="nav-icon" />
          )}
        </i>
      </div>

      <div
        className={
          navDropdown
            ? "nav-items-dropdown flex justify-end my-auto mr-8 lg:mr-2"
            : "nav-items-dropdown-closed flex justify-end my-auto mr-8 lg:mr-2"
        }
      >
        <Link
          className="text-2xl lg:text-lg py-2 px-3 mx-4 lg:mx-2 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
          to="/"
          onClick={onNavDropdown}
        >
          Home
        </Link>
        <Link
          className="text-2xl lg:text-lg py-2 px-3 mx-4 lg:mx-2 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
          to="/activity"
          onClick={onNavDropdown}
        >
          New Activity
        </Link>

        {userStatus === null ? (
          <div className="flex justify-between">
            <Link
              className="text-2xl lg:text-lg py-2 px-3 mx-4 lg:mx-2 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
              to="/login"
              onClick={onNavDropdown}
            >
              Login
            </Link>
            <Link
              className="text-2xl lg:text-lg py-2 px-3 mx-4 lg:mx-2 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
              to="/register"
              onClick={onNavDropdown}
            >
              Register
            </Link>
          </div>
        ) : (
          <div className="flex justify-between">
            <Link
              className="text-2xl lg:text-lg py-2 px-3 mx-4 lg:mx-2 border-solid border-2 border-indigo-400 shadow hover:border-violet-500 hover:bg-violet-400 rounded"
              to="/"
              onClick={onLogout}
            >
              Logout
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
