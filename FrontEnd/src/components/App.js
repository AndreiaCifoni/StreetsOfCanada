import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import UserForm from "./users/UserForm";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<UserForm />} />
      </Routes>
    </div>
  );
};

export default App;
