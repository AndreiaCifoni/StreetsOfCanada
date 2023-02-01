import React, { useState } from "react";
import UserForm from "./UserForm";

const UserLogin = ({ login, setLogin, onLogin }) => {
  return (
    <div className="h-screen flex mt-8 mx-16 bg-indigo-100 rounded font-bold text-xl">
      <UserForm
        formTitle={"Login"}
        user={login}
        setUser={setLogin}
        onSubmitUser={onLogin}
      />
    </div>
  );
};

export default UserLogin;
