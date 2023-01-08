import React from "react";

const ActivityForm = ({ activity, setActivity }) => {
  return (
    <div>
      <form>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={activity.title}
            onChange={(e) =>
              setActivity({ ...activity, title: e.target.value })
            }
          />
        </div>
        <div>
          <label>Tags</label>
          <input
            type=""
            value={activity.tag}
            onChange={(e) => setActivity({ ...activity, tag: e.target.value })}
          />
        </div>
        <div>
          <h1>Location</h1>
          <label>Address</label>
          <input
            type=""
            value={activity.address}
            onChange={(e) =>
              setActivity({ ...activity, address: e.target.value })
            }
          />
          <label>City</label>
          <input
            type=""
            value={activity.city}
            onChange={(e) => setActivity({ ...activity, city: e.target.value })}
          />
          <label>Province</label>
          <input
            type=""
            value={activity.province}
            onChange={(e) =>
              setActivity({ ...activity, province: e.target.value })
            }
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            type=""
            value={activity.photo}
            onChange={(e) =>
              setActivity({ ...activity, photo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type=""
            value={activity.description}
            onChange={(e) =>
              setActivity({ ...activity, description: e.target.value })
            }
          />
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
