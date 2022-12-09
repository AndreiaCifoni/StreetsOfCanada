import React from "react";

const UserForm = () => {
  return (
    <div>
      <h1>This is a form</h1>
      <form>
        <input type="text" value="Name" />
        <input type="email" value="Email" />
        <input type="password" value="Password" />
      </form>
    </div>
  );
};

export default UserForm;
