import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Activity from "./activities/Activity";
import Home from "./Home";
import UserRegister from "./users/UserRegister";
import UserLogin from "./users/UserLogin";
import NavBar from "./NavBar";
import ActivityCreate from "./activities/ActivityCreate";
import { apiURL } from "../globalVariables";
import Footer from "./Footer";

const App = () => {
  const [userStatus, setUserStatus] = useState(null);
  const [login, setLogin] = useState({
    username: "",
    email: null,
    password: "",
  });
  const [navDropdown, setNavDropdown] = useState(false);

  const onNavDropdown = () => {
    setNavDropdown(!navDropdown);
  };

  const navigate = useNavigate();

  const onLogin = async (login) => {
    try {
      const response = await fetch(`${apiURL}/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      });
      const data = await response.json();

      if (data.error === true) throw Error(data.message);

      setUserStatus(data);
      setLogin({ username: "", email: null, password: "" });
      navigate(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  const onLogout = async () => {
    try {
      const response = await fetch(`${apiURL}/logout`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
      const data = await response.json();

      if (data.error === true) throw Error(data.message);

      setUserStatus(null);
      setNavDropdown(!navDropdown);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-full font-mono bg-orange-50 text-indigo-900 ">
      <NavBar
        onLogout={onLogout}
        userStatus={userStatus}
        onNavDropdown={onNavDropdown}
        navDropdown={navDropdown}
      />
      <Routes>
        <Route path={"/"} element={<Home />} />
        <Route
          path={"/register"}
          element={<UserRegister onLogin={onLogin} />}
        />
        <Route
          path={"/login"}
          element={
            <UserLogin login={login} setLogin={setLogin} onLogin={onLogin} />
          }
        />
        <Route
          path={"/activity"}
          element={<ActivityCreate userStatus={userStatus} />}
        />
        <Route
          path={"/activity/:id"}
          element={<Activity userStatus={userStatus} />}
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
