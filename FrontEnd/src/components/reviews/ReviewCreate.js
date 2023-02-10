import React from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { apiURL } from "../../globalVariables";

const ReviewCreate = ({ newReview, setNewReview, fetchReviews }) => {
  let { id } = useParams();

  const onSubmitNewReview = async () => {
    try {
      const response = await fetch(`${apiURL}/activities/${id}/reviews`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          review: newReview.review,
          rating: newReview.rating,
        }),
      });

      if (response.status !== 201) throw Error("Review not created");

      fetchReviews();

      setNewReview({
        review: "",
        rating: 0,
      });
    } catch (error) {
      alert(error);
    }
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
