import React from "react";
import { Rating } from "react-simple-star-rating";

const ReviewCard = ({ user, rating, date, review }) => {
  return (
    <div className="my-2 py-2 px-4 rounded border-solid border-2 border-indigo-400 shadow">
      <div>
        <p className="flex justify-between">
          <span>{user}</span>
          <span className="text-xs">{date.substring(0, 10)}</span>
        </p>

        <div>
          <Rating
            SVGclassName="inline-block"
            initialValue={rating}
            readonly
            fillColor="#4E5AC7"
            size={25}
          />
        </div>
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
