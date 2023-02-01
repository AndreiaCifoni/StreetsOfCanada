import React from "react";

const UserForm = ({ formTitle, user, setUser, onSubmitUser }) => {
  return (
    <div className="w-2/3 lg:w-4/5 sm:w-full sm:mt-0 sm:mx-0 sm:px-4 flex items-center mx-auto mt-8 py-8 px-12 flex-col rounded bg-orange-50">
      <h1 className="text-4xl mb-8">{formTitle}</h1>
      <form
        className="w-2/3 xl:w-11/12 sm:w-9/12 md:px-4 py-4 px-8 flex bg-violet-100 rounded border-solid border-2 border-indigo-400 shadow"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitUser(user);
        }}
      >
        <div>
          <div className="mb-4">
            <label className="mr-4">Username</label>
            <input
              className="focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </div>

          {user.email !== null ? (
            <div className="mb-4">
              <label className="mr-4">Email</label>
              <input
                className="focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
                type="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
              />
            </div>
          ) : (
            ""
          )}
          <div className="mb-8">
            <label className="mr-4">Password</label>
            <input
              className="focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
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
