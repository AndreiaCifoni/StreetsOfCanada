import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";
import ReviewEdit from "./ReviewEdit";

const ReviewCard = ({
  userInfo,
  rating,
  date,
  review,
  reviewId,
  setReviewList,
  reviewList,
  userStatus,
  fetchReviews,
}) => {
  const [isEditingReview, setIsEditingReview] = useState(false);

  const onClickDeleteReview = async () => {
    try {
      const deleteReviews = await fetch(`/reviews/${reviewId}`, {
        method: "DELETE",
      });
      console.log(deleteReviews);
      if (deleteReviews.status !== 200) throw Error("Not deleted");

      fetchReviews();
    } catch (error) {
      alert(error);
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
          userInfo={userInfo}
          rating={rating}
          date={date}
          review={review}
          reviewId={reviewId}
          setReviewList={setReviewList}
          reviewList={reviewList}
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

// {userInfo.user_id === userStatus?.user_id
//   ? (<button
//       className="mt-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
//       onClick={onClickEditReview}
//     >
//       Edit
//     </button>)(
//       <button
//         className="mt-4 mx-3 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
//         onClick={onClickDeleteReview}
//       >
//         Delete
//       </button>
//     )
//   : null}
