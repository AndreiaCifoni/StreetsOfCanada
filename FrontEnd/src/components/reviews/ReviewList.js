import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewsList = ({ reviewList, setReviewList }) => {
  let { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(`/activities/${id}/reviews`);
      const data = await response.json();
      setReviewList(data);
    };
    fetchReviews();
  }, []);

  if (!reviewList) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {reviewList.map((review) => {
        return (
          <ReviewCard
            key={review.review_id}
            user={review.user.username}
            rating={review.rating}
            date={review.date}
            review={review.review}
            reviewId={review.review_id}
            setReviewList={setReviewList}
            reviewList={reviewList}
          />
        );
      })}
    </div>
  );
};

export default ReviewsList;
