import React, { useState } from "react";
import ReviewsList from "./ReviewList";
import ReviewCreate from "./ReviewCreate";

const Reviews = ({ userStatus }) => {
  const [reviewList, setReviewList] = useState(null);
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 0,
  });
  console.log("review list");
  console.log(reviewList);
  return (
    <div>
      <div className="mb-8">
        {userStatus === null ? (
          <p>Login to make a review!</p>
        ) : (
          <ReviewCreate
            newReview={newReview}
            setNewReview={setNewReview}
            setReviewList={setReviewList}
            reviewList={reviewList}
          />
        )}
      </div>
      <ReviewsList reviewList={reviewList} setReviewList={setReviewList} />
    </div>
  );
};

export default Reviews;
