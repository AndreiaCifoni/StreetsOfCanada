import React, { useState } from "react";
import UserForm from "./UserForm";

const UserLogin = () => {
  const [login, setLogin] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onSubmitLogin = () => {
    console.log("Hi login");
  };

  return (
    <div>
      <UserForm user={login} setUser={setLogin} onSubmitUser={onSubmitLogin} />
    </div>
  );
};

export default UserLogin;
