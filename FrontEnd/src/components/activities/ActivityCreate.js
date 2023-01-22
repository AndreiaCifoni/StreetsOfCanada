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
    user_id: userStatus.username,
  });

  const navigate = useNavigate();

  const onSubmitNewActivity = async () => {
    const data = await fetch("/activities", {
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
        user_id: userStatus.username,
      }),
    });
    const response = await data.json();
    navigate(`/activity/${response.activity_id}`);
  };

  return (
    <ActivityForm
      activity={newActivity}
      setActivity={setNewActivity}
      onSubmitActivity={onSubmitNewActivity}
    />
  );
};

export default ActivityCreate;
