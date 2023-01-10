import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import "../../index.css";
import ReviewsList from "../reviews/ReviewList";
import ReviewCard from "../reviews/ReviewCard";

const Activity = () => {
  const [activity, setActivity] = useState(null);

  let { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch(`http://localhost:3000/activities/${id}`);
      const data = await response.json();
      setActivity(data);
    };
    fetchActivity();
  }, []);

  if (!activity) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex mt-8 mx-16 bg-indigo-100 rounded">
      <div className="w-2/5 m-4">
        <img
          className="w-11/12 h-96 object-cover rounded-md shadow-md "
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
          <p>Date: {activity.date_created.substring(0, 10)}</p>
        </div>
        <button className="my-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          Edit
        </button>
        <button className="my-4 mx-3 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow">
          Delete
        </button>
      </div>
      <div className="w-3/5 m-4">
        <h1 className="text-3xl font-bold my-4">
          {activity.title}
          <span className="text-lg">
            {" "}
            - {activity.city.name}/{activity.city.province_id}
          </span>
        </h1>
        <div className="flex gap-2">
          {activity.tags.map((tag) => {
            return (
              <span
                className={
                  tag === "nature"
                    ? "bg-emerald-200"
                    : tag === "city"
                    ? "bg-gray-200"
                    : tag === "lake/beach"
                    ? "bg-cyan-200"
                    : "bg-orange-200"
                }
              >
                {tag}
              </span>
            );
          })}
        </div>
        <p className="text-lg my-8 mr-16">{activity.description}</p>
        <div className="bg-slate-50 rounded w-4/5 py-3.5 px-4 h-">
          <h2 className="text-2xl font-bold">Reviews:</h2>
          <ReviewsList />
          <ReviewCard />
        </div>
      </div>
    </div>
  );
};

export default Activity;
