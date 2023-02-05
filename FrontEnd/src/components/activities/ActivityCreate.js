import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ActivityForm from "./ActivityForm";

const ActivityCreate = ({ userStatus }) => {
  const [newActivity, setNewActivity] = useState({
    title: "",
    tags_ids: [],
    address: "",
    city_name: "",
    province_id: "",
    photo: "",
    description: "",
    user_id: userStatus?.user_id,
  });

  const navigate = useNavigate();

  const onSubmitNewActivity = async () => {
    try {
      const response = await fetch("/activities", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newActivity.title,
          tags_ids: newActivity.tags_ids,
          address: newActivity.address,
          city_name: newActivity.city_name,
          province_id: newActivity.province_id,
          photo: newActivity.photo,
          description: newActivity.description,
          user_id: userStatus.user_id,
        }),
      });
      const data = await response.json();

      if (response.status !== 201) throw Error("Activity not created");

      navigate(`/activity/${data.activity_id}`);
    } catch (error) {
      alert(error);
    }
  };

  const messageNewActivity = (
    <div className="h-screen flex justify-center p-8">
      <p className="mt-40 font-bold text-3xl lg:text-2xl md:text-xl ">
        Hello there!! Please, register or login to do a new activity!
      </p>
    </div>
  );

  return (
    <div className="">
      {userStatus === null ? (
        messageNewActivity
      ) : (
        <ActivityForm
          activity={newActivity}
          setActivity={setNewActivity}
          onSubmitActivity={onSubmitNewActivity}
          editForm={false}
        />
      )}
    </div>
  );
};

export default ActivityCreate;
