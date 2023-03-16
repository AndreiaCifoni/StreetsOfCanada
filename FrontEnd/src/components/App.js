import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Activity from "./activities/Activity";
import Home from "./Home";
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import NavBar from "./NavBar";
import ActivityCreate from "./activities/ActivityCreate";
import Footer from "./Footer";

const App = () => {
  const [navDropdown, setNavDropdown] = useState(false);

  const onNavDropdown = () => {
    setNavDropdown(!navDropdown);
  };

  return (
    <div className="h-full  font-mono bg-orange-50 text-indigo-900 ">
      <UserContextProvider>
        <NavBar onNavDropdown={onNavDropdown} navDropdown={navDropdown} />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/register"} element={<UserRegister />} />
          <Route path={"/login"} element={<UserLogin />} />
          <Route path={"/activity"} element={<ActivityCreate />} />
          <Route path={"/activity/:id"} element={<Activity />} />
        </Routes>
      </UserContextProvider>
      <Footer />
    </div>
  );
};

export default App;
