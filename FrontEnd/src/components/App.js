import React from "react";
import { Routes, Route } from "react-router-dom";
import Activity from "./activities/Activity";
import Home from "./Home";
import UserForm from "./users/UserForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<UserForm />} />
        {/* change the next to"activity/:id" */}
        <Route path={"/activity/:id"} element={<Activity />} />
      </Routes>
    </div>
  );
};

export default App;
