import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import ReviewEdit from "./ReviewEdit";

const ReviewCard = ({
  user,
  rating,
  date,
  review,
  reviewId,
  setReviewList,
  reviewList,
}) => {
  const [isEditingReview, setIsEditingReview] = useState(false);

  const onClickDeleteReview = async () => {
    try {
      const deleteReviews = await fetch(`/reviews/${reviewId}`, {
        method: "DELETE",
      });
      const filteredList = reviewList.filter(
        (review) => review.review_id !== reviewId
      );
      setReviewList(filteredList);
    } catch {
      alert("Something went wrong");
    }
  };

  const onClickEditReview = () => {
    setIsEditingReview(true);
  };

  const onClickCancelEditReview = () => {
    setIsEditingReview(false);
  };

  return (
    <div className="my-2 py-2 px-4 rounded border-solid border-2 border-indigo-400 shadow">
      {isEditingReview ? (
        <ReviewEdit
          onClickCancelEditReview={onClickCancelEditReview}
          user={user}
          rating={rating}
          date={date}
          review={review}
          reviewId={reviewId}
          setReviewList={setReviewList}
          reviewList={reviewList}
        />
      ) : (
        <div>
          <div>
            <p className="flex justify-between">
              <span>{user}</span>
              <span className="text-xs">{date.substring(0, 10)}</span>
            </p>

            <div>
              <Rating
                SVGclassName="inline-block"
                initialValue={rating}
                readonly
                fillColor="#4E5AC7"
                size={25}
              />
            </div>
            <p>{review}</p>
          </div>
          <div>
            <button
              className="mt-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
              onClick={onClickEditReview}
            >
              Edit
            </button>
            <button
              className="mt-4 mx-3 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
              onClick={onClickDeleteReview}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
