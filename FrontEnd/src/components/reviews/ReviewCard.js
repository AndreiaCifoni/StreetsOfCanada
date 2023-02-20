import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import ReviewEdit from "./ReviewEdit";
import { apiURL } from "../../globalVariables";

const ReviewCard = ({
  userInfo,
  rating,
  date,
  review,
  reviewId,
  userStatus,
  fetchReviews,
}) => {
  const [isEditingReview, setIsEditingReview] = useState(false);

  const onClickDeleteReview = async () => {
    try {
      const response = await fetch(`${apiURL}/reviews/${reviewId}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      if (data.error === true) throw Error(data.message);

      fetchReviews();
    } catch (error) {
      console.log(error);
    }
  };

  const onClickEditReview = () => {
    setIsEditingReview(true);
  };

  const onClickCancelEditReview = () => {
    setIsEditingReview(false);
  };

  const editAndDeleteBtn = (
    <>
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
    </>
  );

  return (
    <div className="my-2 py-2 px-4 rounded border-solid border-2 border-indigo-400 shadow">
      {isEditingReview ? (
        <ReviewEdit
          onClickCancelEditReview={onClickCancelEditReview}
          rating={rating}
          review={review}
          reviewId={reviewId}
          fetchReviews={fetchReviews}
        />
      ) : (
        <div>
          <div>
            <p className="flex justify-between">
              <span>{userInfo.username}</span>
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
            {userInfo.user_id === userStatus?.user_id ? editAndDeleteBtn : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
