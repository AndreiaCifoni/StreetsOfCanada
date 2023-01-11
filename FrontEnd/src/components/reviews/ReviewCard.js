import React from "react";

const ReviewCard = ({ user, rating, date, review }) => {
  return (
    <div className="py-2 px-4 rounded border-solid border-2 border-indigo-400 shadow">
      <div>
        <p>{user}</p>
        <p>
          Rating:{rating}
          <span>{date.substring(0, 10)}</span>
        </p>
        <p>{review}</p>
      </div>
      <div>
        <button className="mt-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          Edit
        </button>
        <button className="mt-4 mx-3 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
