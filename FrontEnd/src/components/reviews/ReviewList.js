import React, { useEffect } from "react";
//import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewsList = ({
  reviewList,
  setReviewList,
  userStatus,
  fetchReviews,
}) => {
  //let { id } = useParams();

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
            setReviewList={setReviewList}
            reviewList={reviewList}
            userStatus={userStatus}
            fetchReviews={fetchReviews}
          />
        );
      })}
    </div>
  );
};

export default ReviewsList;
