import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserForm from "./UserForm";

const UserRegister = ({ onLogin }) => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

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

      navigate(`/`);

      setRegister({ username: "", email: "", password: "" });
    } catch {
      alert("Could not register");
    }
  };

  return (
    <div className="h-screen sm:mx-0 flex mt-8 mx-16 bg-indigo-100 rounded font-bold text-xl">
      <UserForm
        formTitle={"Register"}
        user={register}
        setUser={setRegister}
        onSubmitUser={onSubmitRegister}
      />
    </div>
  );
};

export default UserRegister;
