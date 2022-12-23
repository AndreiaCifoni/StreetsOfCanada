import React from "react";

const ActivityForm = () => {
  return (
    <div>
      <form>
        <label>
          Title
          <input className="" type="text" />
        </label>
        <label>
          Description
          <textarea />
        </label>
        <label>
          Address
          <input className="" type="text" />
        </label>
        {/* <label>
          Latitude
        <input className="" type="" />
        </label>
        <label>
        Longitude
        <input className="" type="" />
        </label> */}
        <label>
          Photo
          <input className="" type="text" />
        </label>
        {/* <label>
          UserId
        <input className="" type="" />
        </label>
        <label>
          City
        <input className="" type="" />
        </label>
        <label>
          Tags
        </label>
        <input className="" type="" /> */}
      </form>
    </div>
  );
};

export default ActivityForm;
