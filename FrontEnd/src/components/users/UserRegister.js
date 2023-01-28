import React, { useState } from "react";
import UserForm from "./UserForm";

const UserRegister = ({ onLogin }) => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmitRegister = async () => {
    try {
      const response = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: register.username,
          email: register.email,
          password: register.password,
        }),
      });
      const data = await response.json();

      if (data.error === true) throw Error(data.message);

      onLogin(register);
      setRegister({ username: "", email: "", password: "" });
    } catch {
      alert("Could not register");
    }
  };

  return (
    <div>
      <UserForm
        user={register}
        setUser={setRegister}
        onSubmitUser={onSubmitRegister}
      />
    </div>
  );
};

export default UserRegister;
