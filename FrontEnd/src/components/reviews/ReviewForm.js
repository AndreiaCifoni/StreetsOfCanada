import React from "react";

const ReviewForm = () => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // onSubmitReview(review);
      }}
    >
      <div className="py-2 px-4 rounded border-solid border-2 border-indigo-400 shadow">
        <label>Leave our rating:</label>
        <div>
          <textarea
            className="w-11/12 h-20"
            type="text"
            //value={review.review}
            // onChange={(e) =>
            //   setReview({ ...review, description: e.target.value })
            // }
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
