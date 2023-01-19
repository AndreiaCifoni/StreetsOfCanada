import React, { useState } from "react";
import ReviewsList from "./ReviewList";
import ReviewCreate from "./ReviewCreate";

const Reviews = () => {
  const [reviewList, setReviewList] = useState(null);
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 0,
  });

  return (
    <div>
      <div className="mb-8">
        <ReviewCreate
          newReview={newReview}
          setNewReview={setNewReview}
          setReviewList={setReviewList}
          reviewList={reviewList}
        />
      </div>
      <ReviewsList reviewList={reviewList} setReviewList={setReviewList} />
    </div>
  );
};

export default Reviews;
