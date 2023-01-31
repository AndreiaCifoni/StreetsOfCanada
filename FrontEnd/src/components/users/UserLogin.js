import React, { useState } from "react";
import UserForm from "./UserForm";

const UserLogin = ({ login, setLogin, onLogin }) => {
  return (
    <div>
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
