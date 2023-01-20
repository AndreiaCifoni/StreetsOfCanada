import React, { useState } from "react";
import UserForm from "./UserForm";

const UserRegister = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const onSubmitRegister = async () => {
    try {
      const response = await fetch(`http://localhost:3000/register`, {
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

      setRegister({ username: "", email: "", password: "" });
    } catch {
      alert("Couldn't register");
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
