import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <h1>Streets Of Canada</h1>
      <div>
        <Link to="/">Home</Link>
        <Link to="/acivity">New Activity</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
};

export default NavBar;
