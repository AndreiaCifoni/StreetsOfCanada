import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

const ReviewForm = ({ review, setReview, onSubmitReview }) => {
  const onClickRating = (rate) => {
    setReview({ ...review, rating: rate });
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmitReview(review);
      }}
    >
      <div className="py-2 px-4 ">
        <div className="mb-2">
          <label className="mr-4">Leave our rating:</label>
          <Rating
            SVGclassName="inline-block"
            onClick={onClickRating}
            initialValue={review.rating}
            fillColor="#4E5AC7"
            size={25}
          />
        </div>
        <div>
          <textarea
            className="w-11/12 h-20 py-1 px-2"
            type="text"
            value={review.review}
            onChange={(e) => setReview({ ...review, review: e.target.value })}
          />
        </div>
        <input
          className="mt-2 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
          type="submit"
          value="Submit"
        />
      </div>
    </form>
  );
};

export default ReviewForm;
