import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";

const ReviewCreate = ({
  newReview,
  setNewReview,
  setReviewList,
  reviewList,
}) => {
  let { id } = useParams();

  const onSubmitNewReview = async () => {
    const data = await fetch(`http://localhost:3000/activities/${id}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user_id: 1,
        review: newReview.review,
        rating: newReview.rating,
      }),
    });
    const response = await data.json();

    setReviewList([...reviewList, response]);
    //clean the form
    setNewReview({
      user_id: 1,
      review: "",
      rating: 0,
    });
  };

  return (
    <ReviewForm
      review={newReview}
      setReview={setNewReview}
      onSubmitReview={onSubmitNewReview}
    />
  );
};

export default ReviewCreate;
