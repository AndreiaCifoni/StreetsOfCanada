import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

const ActivityCreate = () => {
  const [newActivity, setNewActivity] = useState({
    title: "",
    tags_ids: [],
    address: "",
    city_name: "",
    province_id: "",
    photo: "",
    description: "",
    user_id: 1,
  });

  const onSubmitNewActivity = async () => {
    const data = await fetch("http://localhost:3000/activities", {
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
        user_id: 1,
      }),
    }).then((res) => res.json());
    console.log(data);
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
