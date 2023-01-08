import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

const ActivityCreate = () => {
  const [newActivity, setNewActivity] = useState({
    title: "",
    tag_id: ["nature", "city"],
    address: "",
    city: "Toronto",
    province: "ON",
    photo: "",
    description: "",
    user_id: 1,
  });

  console.log(newActivity);
  const onSubmitNewActivity = async () => {
    const data = await fetch("http://localhost:3000/activities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: newActivity,
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
