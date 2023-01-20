import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Activity from "./activities/Activity";
import Home from "./Home";
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import NavBar from "./NavBar";
import ActivityCreate from "./activities/ActivityCreate";

const App = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [login, setLogin] = useState({
    username: "",
    email: null,
    password: "",
  });

  const onLogin = async () => {
    try {
      const response = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      });
      const data = await response.json();

      setUserStatus(data);
      setLogin({ username: "", email: null, password: "" });
    } catch {
      alert("Couldn't login");
    }
  };

  const onLogout = async () => {
    try {
      const logout = await fetch(`http://localhost:3000/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      setUserStatus(null);
    } catch {
      alert("Couldn't logout");
    }
  };

  return (
    <div className="font-mono bg-orange-50 text-indigo-900 ">
      <NavBar onLogout={onLogout} userStatus={userStatus} />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route path={"/register"} element={<UserRegister />} />
        <Route
          path={"/login"}
          element={
            <UserLogin login={login} setLogin={setLogin} onLogin={onLogin} />
          }
        />
        <Route path={"/activity"} element={<ActivityCreate />} />
        <Route path={"/activity/:id"} element={<Activity />} />
      </Routes>
    </div>
  );
};

export default App;
