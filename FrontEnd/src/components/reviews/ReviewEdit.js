import React, { useState } from "react";
import ReviewForm from "./ReviewForm";
import { apiURL } from "../../globalVariables";

const ReviewEdit = ({
  onClickCancelEditReview,
  rating,
  review,
  reviewId,
  fetchReviews,
}) => {
  const [editReview, setEditReview] = useState({
    review: review,
    rating: rating,
  });

  const onSubmitEditReview = async () => {
    try {
      const response = await fetch(`${apiURL}/reviews/${reviewId}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: editReview.review,
          rating: editReview.rating,
        }),
      });
      const data = await response.json();

      if (data.error === true) throw Error(data.message);

      fetchReviews();

      onClickCancelEditReview();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ReviewForm
        review={editReview}
        setReview={setEditReview}
        onSubmitReview={onSubmitEditReview}
      />
      <button
        className="mt-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
        onClick={onClickCancelEditReview}
      >
        Cancel
      </button>
    </div>
  );
};

export default ReviewEdit;
