import React from "react";

const ReviewCard = () => {
  return (
    <div className="py-2 px-4 rounded border-solid border-2 border-indigo-400 shadow">
      <div>
        <p>User</p>
        <p>
          Rating <span>date</span>
        </p>
        <p>
          Message:Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
          semper eu lectus ac maximus. Sed non posuere arcu. Fusce pharetra arcu
          justo, vel mollis ante fermentum nec.
        </p>
      </div>
      <div>
        <button className="my-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          Edit
        </button>
        <button className="my-4 mx-3 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ReviewCard;
