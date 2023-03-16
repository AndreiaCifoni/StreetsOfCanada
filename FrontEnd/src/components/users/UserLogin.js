import React, { useContext } from "react";
import { UserContext } from "../../UserContextProvider";
import UserForm from "./UserForm";

const UserLogin = () => {
  const { login, setLogin, onLogin } = useContext(UserContext);

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
