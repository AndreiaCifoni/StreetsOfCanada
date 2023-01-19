import React, { useState } from "react";
import UserForm from "./UserForm";

const UserLogin = () => {
  const [login, setLogin] = useState({
    username: "",
    email: null,
    password: "",
  });

  const onSubmitLogin = async () => {
    try {
      const data = await fetch(`http://localhost:3000/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: login.username,
          password: login.password,
        }),
      });
      const response = await data.json();
      console.log(response);
      setLogin({ username: "", email: null, password: "" });
    } catch {
      alert("Couldn't login");
    }
  };

  return (
    <div>
      <UserForm user={login} setUser={setLogin} onSubmitUser={onSubmitLogin} />
    </div>
  );
};

export default UserLogin;
