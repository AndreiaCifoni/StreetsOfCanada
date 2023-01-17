import React, { useState } from "react";
import UserForm from "./UserForm";

const UserRegister = () => {
  const [register, setRegister] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmitRegister = () => {
    console.log("Hi Register");
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
