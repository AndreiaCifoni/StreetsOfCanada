import React, { useEffect } from "react";
import ReviewCard from "./ReviewCard";

const ReviewsList = ({
  reviewList,
  setReviewList,
  userStatus,
  fetchReviews,
}) => {
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  if (!reviewList) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {reviewList.map((review) => {
        return (
          <ReviewCard
            key={review.review_id}
            userInfo={review.user}
            rating={review.rating}
            date={review.date}
            review={review.review}
            reviewId={review.review_id}
            userStatus={userStatus}
            fetchReviews={fetchReviews}
          />
        );
      })}
    </div>
  );
};

export default ReviewsList;
