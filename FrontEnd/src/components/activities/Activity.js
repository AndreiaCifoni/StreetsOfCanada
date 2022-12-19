import React from "react";
import "../../layout.css";

const Activity = () => {
  return (
    <div className="activity-container">
      <div>
        <img
          className="activity-img"
          src="https://images.unsplash.com/photo-1519331379826-f10be5486c6f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt="Park"
        />
        <p>User Name</p>
        <p>Date created</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div>
        <h1>Title</h1>
        <p>Location</p>
        <p>description</p>
        {/* <div>Here goes the comment box</div> */}
      </div>
    </div>
  );
};

export default Activity;
