import React, { useState, useEffect } from "react";
import ActivityCard from "./ActivityCard";

const ActivityList = () => {
  const [activityList, setActivityList] = useState(null);

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch("http://localhost:3000/activities");
      const data = await response.json();
      setActivityList(data);
      console.log(data);
    };
    fetchActivity();
  }, []);

  if (!activityList) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-col mb-16">
      {activityList.map((activity) => {
        return (
          <ActivityCard
            photo={activity.photo}
            title={activity.title}
            city={activity.city.name}
            tags={activity.tags}
            description={activity.description.substring(0, 200) + "..."}
          />
        );
      })}
    </div>
  );
};

export default ActivityList;
