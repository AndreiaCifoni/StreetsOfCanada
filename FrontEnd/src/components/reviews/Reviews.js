import React, { useState, useCallback } from "react";
import ReviewsList from "./ReviewList";
import ReviewCreate from "./ReviewCreate";

const Reviews = ({ userStatus, activityId }) => {
  const [reviewList, setReviewList] = useState(null);
  const [newReview, setNewReview] = useState({
    review: "",
    rating: 0,
  });

  const fetchReviews = useCallback(async () => {
    try {
      const response = await fetch(`/activities/${activityId}/reviews`);
      const data = await response.json();

      if (response.status !== 200) throw Error("Could not get reviews");

      setReviewList(data);
    } catch (error) {
      alert(error);
    }
  }, [activityId]);

  return (
    <div>
      <div className="mb-8">
        {userStatus === null ? (
          <p>Login to make a review!</p>
        ) : (
          <ReviewCreate
            newReview={newReview}
            setNewReview={setNewReview}
            fetchReviews={fetchReviews}
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
