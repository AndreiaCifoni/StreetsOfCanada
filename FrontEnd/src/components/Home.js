import React from "react";
import NavBar from "./NavBar";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div>
        <Link to="/activity">Activity</Link>
        <Link to="/form">ActivityForm</Link>
      </div>
    </div>
  );
};

export default Home;
