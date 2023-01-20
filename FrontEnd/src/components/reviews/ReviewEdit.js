import React, { useState } from "react";
import ReviewForm from "./ReviewForm";

const ReviewEdit = ({
  onClickCancelEditReview,
  user,
  rating,
  date,
  review,
  reviewId,
  setReviewList,
  reviewList,
}) => {
  const [editReview, setEditReview] = useState({
    user_id: 1,
    review: review,
    rating: rating,
  });

  const onSubmitEditReview = async () => {
    try {
      await fetch(`/reviews/${reviewId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          review: editReview.review,
          rating: editReview.rating,
        }),
      });
      const editedReviewList = reviewList.map((review) => {
        if (review.review_id === reviewId) {
          review.review = editReview.review;
          review.rating = editReview.rating;
          return review;
        }
        return review;
      });
      setReviewList(editedReviewList);
      onClickCancelEditReview();
    } catch {
      alert("Error");
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
