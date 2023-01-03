import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import ActivityCard from "./ActivityCard";
import "../utilities/dropdownStyle.css";

const ActivityList = () => {
  const [activityList, setActivityList] = useState(null);
  // const [value, setValue] = useState("");

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch("http://localhost:3000/activities");
      const data = await response.json();
      setActivityList(data);
      console.log(data);
    };
    fetchActivity();
  }, []);

  const options = [
    { value: "", label: "All" },
    { value: "nature", label: "nature" },
    { value: "city", label: "city" },
    { value: "lake/beach", label: "lake/beach" },
    { value: "art", label: "art" },
    { value: "food", label: "food" },
    { value: "music", label: "music" },
    { value: "sport", label: "sport" },
  ];

  const onDropdownChange = async (option) => {
    const paramValue = option.value;
    const response = await fetch(
      "http://localhost:3000/activities?" +
        new URLSearchParams({
          tags: paramValue,
        })
    );
    const data = await response.json();
    setActivityList(data);
    console.log(paramValue);
  };

  if (!activityList) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-col mb-16">
      <div>
        <Dropdown
          options={options}
          onChange={onDropdownChange}
          placeholder="Filter by tag"
        />
      </div>
      {activityList.map((activity) => {
        return (
          <ActivityCard
            activity_id={activity.activity_id}
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
