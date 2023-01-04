import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import ActivityCard from "./ActivityCard";
import "../utilities/dropdownStyle.css";

const ActivityList = () => {
  const [activityList, setActivityList] = useState(null);
  const [tags, setTags] = useState([{ value: "", label: "All tags" }]);

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await fetch("http://localhost:3000/activities");
      const data = await response.json();
      setActivityList(data);
    };
    fetchActivity();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:3000/tags");
      const tagsData = await response.json();
      const dropdownTags = tagsData.map((tag) => {
        const listOfTags = { value: tag.name, label: tag.name };
        return listOfTags;
      });

      setTags([...tags, ...dropdownTags]);
    };
    fetchTags();
  }, []);

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
  };

  if (!activityList) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-col mb-16">
      <div>
        <Dropdown
          options={tags}
          onChange={onDropdownChange}
          placeholder="Filter by tag"
        />
      </div>
      {activityList.map((activity) => {
        return (
          <ActivityCard
            key={activity.activity_id}
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
