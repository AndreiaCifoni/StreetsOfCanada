import React, { useState } from "react";
import ReviewsList from "./ReviewList";
import ReviewCreate from "./ReviewCreate";

const Reviews = ({ userStatus }) => {
  const [reviewList, setReviewList] = useState(null);
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 0,
  });

  const fetchReviews = async (id) => {
    const response = await fetch(`/activities/${id}/reviews`);
    const data = await response.json();
    setReviewList(data);
  };

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
      <ReviewsList
        reviewList={reviewList}
        setReviewList={setReviewList}
        userStatus={userStatus}
        fetchReviews={fetchReviews}
      />
    </div>
  );
};

export default Reviews;
