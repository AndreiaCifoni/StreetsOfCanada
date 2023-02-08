import React, { useState } from "react";
import ActivityForm from "./ActivityForm";
import { apiURL } from "../../globalVariables";

const ActivityEdit = ({
  onClickCancelEditActivity,
  activity,
  activityId,
  fetchActivity,
}) => {
  const [editActivity, setEditActivity] = useState({
    title: activity.title,
    tags_ids: activity.tagsId,
    address: activity.address,
    city_name: activity.city.name,
    province_id: activity.city.province_id,
    photo: activity.photo,
    description: activity.description,
    user_id: activity.user_id,
  });
  console.log(activity);

  const onSubmitEditActivity = async () => {
    try {
      const response = await fetch(`${apiURL}/activities/${activityId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editActivity.title,
          tags_ids: editActivity.tags_ids,
          address: editActivity.address,
          city_name: editActivity.city_name,
          province_id: editActivity.province_id,
          photo: editActivity.photo,
          description: editActivity.description,
          user_id: activity.user_id,
        }),
      });

      const data = await response.json();

      if (data.error === true) throw Error(data.message);

      fetchActivity();

      onClickCancelEditActivity();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="">
      <ActivityForm
        activity={editActivity}
        setActivity={setEditActivity}
        onSubmitActivity={onSubmitEditActivity}
        onClickCancelEditActivity={onClickCancelEditActivity}
        editForm={true}
      />
    </div>
  );
};

export default ActivityEdit;
