import React from "react";
import UserForm from "./UserForm";

const UserLogin = ({ login, setLogin, onLogin }) => {
  return (
    <div className="h-screen pb-8 sm:mx-0 flex mt-8 mx-16 bg-indigo-100 rounded font-bold text-xl">
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
