import React, { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiURL } from "./globalVariables";

export const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
  const [userStatus, setUserStatus] = useState(null);
  const [login, setLogin] = useState({
    username: "",
    email: null,
    password: "",
  });

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

  const value = {
    onLogin,
    onLogout,
    userStatus,
    setUserStatus,
    login,
    setLogin,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
