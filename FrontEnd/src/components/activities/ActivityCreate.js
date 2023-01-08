import React, { useState } from "react";
import ActivityForm from "./ActivityForm";

const ActivityCreate = () => {
  const [newActivity, setNewActivity] = useState({
    title: "",
    tag: "",
    address: "",
    city: "",
    province: "",
    photo: "",
    description: "",
  });

  return <ActivityForm activity={newActivity} setActivity={setNewActivity} />;
};

export default ActivityCreate;
