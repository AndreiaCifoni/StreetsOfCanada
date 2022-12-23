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
    <div className="">
      <div className="">
        <img className="" src={activity.photo} alt={activity.title} />
        <p className="">{activity.user.name}</p>
        <p className="">{activity.date_created}</p>
        <button>Edit</button>
        <button>Delete</button>
      </div>
      <div className="">
        <h1 className="">{activity.title}</h1>
        <p className="">{activity.city.name}</p>
        <p className="">{activity.description}</p>
        <MapContainer
          style={{ height: "300px" }}
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
        {/* <div>Here goes the comment box</div> */}
      </div>
    </div>
  );
};

export default Activity;
