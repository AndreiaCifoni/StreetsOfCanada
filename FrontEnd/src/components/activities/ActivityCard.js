import React from "react";

const ActivityCard = ({ photo, title, city, tags, description }) => {
  return (
    <div className="flex w-4/5 h-64 mx-auto">
      <div className="w-1/3 bg-red-100 ">
        <img
          className="w-72 h-56 object-cover rounded-md shadow-md"
          src={photo}
          alt={title}
        />
      </div>
      <div className="w-2/3 bg-green-100 relative">
        <h1 className="text-3xl font-bold my-4 relative">
          {title}
          <span className="text-lg"> - {city}</span>
          <span className="text-base absolute right-4">{tags}</span>
        </h1>
        <p className="text-lg my-1">{description}</p>
        <button className="mb-4 py-0.5 px-1.5 absolute right-4 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          See activity
        </button>
      </div>
    </div>
  );
};

export default ActivityCard;
