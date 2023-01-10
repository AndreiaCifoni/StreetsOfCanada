import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard";

const ReviewsList = () => {
  const [reviewList, setReviewList] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await fetch(
        `http://localhost:3000/activities/${id}/reviews`
      );
      const data = await response.json();
      setReviewList(data);
    };
    fetchReviews();
  }, []);
  console.log(reviewList);
  if (!reviewList) {
    return <div>Loading</div>;
  }
  return (
    <div>
      {reviewList.map((review) => {
        return (
          <ReviewCard
            user={review.user.name}
            rating={review.rating}
            date={review.date}
            review={review.review}
          />
        );
      })}
    </div>
  );
};

export default ReviewsList;
