import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../layout.css";

const Activity = () => {
  const [activity, setActivity] = useState(null);

  let { id } = useParams();

  useEffect(async () => {
    const response = await fetch(`http://localhost:3000/activities/${id}`);
    const data = await response.json();
    console.log(data);
    setActivity(data);
  }, []);

  if (!activity) {
    return <div>Loading</div>;
  }

  return (
    <div className="activity-container">
      <div className="activity-column">
        <img
          className="activity-img"
          src={activity.photo}
          alt={activity.tags_ids[0]}
        />
        <p className="activity-small-text">{activity.user_id.name}</p>
        <p className="activity-small-text">{activity.date_created}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="activity-column">
        <h1>{activity.title}</h1>
        <p className="activity-small-text">{activity.city_id.name}</p>
        <p className="activity-medium-text">{activity.description}</p>
        {/* <div>Here goes the comment box</div> */}
      </div>
    </div>
  );
};

export default Activity;
