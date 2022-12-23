import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../index.css";

const Activity = () => {
  const [activity, setActivity] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(`http://localhost:3000/activities/${id}`);
      const data = await response.json();
      setActivity(data);
      console.log(data);
    };
    fetchActivity();
  }, []);

  if (!activity) {
    return <div>Loading</div>;
  }

  return (
    <div className="">
      <div className="">
        <img className="" src={activity.photo} alt={activity.tags_ids[0]} />
        <p className="">{activity.user_id.name}</p>
        <p className="">{activity.date_created}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="">
        <h1 className="">{activity.title}</h1>
        <p className="">{activity.city_id.name}</p>
        <p className="">{activity.description}</p>
        {/* <div>Here goes the comment box</div> */}
      </div>
    </div>
  );
};

export default Activity;
