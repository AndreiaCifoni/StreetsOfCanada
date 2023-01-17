import React from "react";
import { Routes, Route } from "react-router-dom";
import Activity from "./activities/Activity";
import Home from "./Home";
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import NavBar from "./NavBar";
import ActivityCreate from "./activities/ActivityCreate";

const App = () => {
  return (
    <div className="font-mono bg-orange-50 text-indigo-900 ">
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<UserRegister />} />
        <Route path={"/login"} element={<UserLogin />} />
        <Route path={"/activity"} element={<ActivityCreate />} />
        <Route path={"/activity/:id"} element={<Activity />} />
      </Routes>
    </div>
  );
};

export default App;
