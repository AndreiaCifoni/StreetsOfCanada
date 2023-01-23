import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewEdit = ({
  onClickCancelEditReview,
  userInfo,
  rating,
  date,
  review,
  reviewId,
  setReviewList,
  reviewList,
  fetchReviews,
}) => {
  const [editReview, setEditReview] = useState({
    review: review,
    rating: rating,
  });

  const onSubmitEditReview = async () => {
    try {
      const response = await fetch(`/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: editReview.review,
          rating: editReview.rating,
        }),
      });

      if (response.status !== 200) throw Error("Not Edit");

      fetchReviews();

      onClickCancelEditReview();
    } catch (error) {
      alert(error);
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
