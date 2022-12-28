import React from "react";
import { Routes, Route } from "react-router-dom";
import Activity from "./activities/Activity";
import ActivityForm from "./activities/ActivityForm";
import Home from "./Home";
import UserForm from "./users/UserForm";
import NavBar from "./NavBar";

const App = () => {
  return (
    <div className="font-mono bg-orange-50 text-indigo-900 ">
      <NavBar />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<UserForm />} />
        {/* change the next to"activity/:id" */}
        <Route path={"/activity/:id"} element={<Activity />} />
        <Route path={"/form"} element={<ActivityForm />} />
      </Routes>
    </div>
  );
};

export default App;
