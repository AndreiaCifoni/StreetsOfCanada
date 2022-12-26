import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Link to="/activity">Activity</Link>
      <Link to="/form">ActivityForm</Link>
    </div>
  );
};

export default Home;
