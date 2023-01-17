import React from "react";

const UserForm = ({ user, setUser, onSubmitUser }) => {
  return (
    <div>
      <h1>This is a form</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitUser(user);
        }}
      >
        <div>
          <div>
            <label>Username</label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {user.email !== null ? (
            <div>
              <label>Email</label>
              <input
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          ) : (
            ""
          )}
          <div>
            <label>Password</label>
            <input
              type="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </div>
          <input
            className="mt-2 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default UserForm;
