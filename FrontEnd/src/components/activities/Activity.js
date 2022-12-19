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
          src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Park"
        />
        <p className="activity-small-text">User Name</p>
        <p className="activity-small-text">Date created</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="activity-column">
        <h1>{activity.title}</h1>
        <p className="activity-small-text">Location</p>
        <p className="activity-medium-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et nisi
          tortor. Aliquam erat volutpat. Fusce non massa sed ligula elementum
          consectetur. Morbi in metus id dolor vestibulum placerat. Aliquam
          lectus lorem, sodales a ipsum nec, consectetur interdum nisl. Nam
          interdum sit amet quam sed pellentesque.
        </p>
        {/* <div>Here goes the comment box</div> */}
      </div>
    </div>
  );
};

export default Activity;
