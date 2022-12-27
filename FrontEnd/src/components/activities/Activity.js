import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
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
    <div className="flex mt-8 mx-16 ">
      <div className=" w-2/5">
        <img
          className="w-11/12 h-4/6 object-cover rounded-md"
          src={activity.photo}
          alt={activity.title}
        />
        <h2 className="text-xl font-bold mt-4 mb-2">Location:</h2>
        <MapContainer
          style={{ width: "420px", height: "180px" }}
          center={[activity.latitude, activity.longitude]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[activity.latitude, activity.longitude]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
        <div className="my-4">
          <p>Created by {activity.user.name}</p>
          <p>Date: {activity.date_created}</p>
        </div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className=" w-3/5">
        <h1 className="text-3xl font-bold my-4">
          {activity.title}{" "}
          <span className="text-lg"> - {activity.city.name}</span>
        </h1>
        <p>My tags go here</p>
        <p className="text-lg my-8">{activity.description}</p>
        <div>
          <h2 className="text-2xl font-bold">Reviews:</h2>
        </div>

        {/* <div>Here goes the comment box</div> */}
      </div>
    </div>
  );
};

export default Activity;
