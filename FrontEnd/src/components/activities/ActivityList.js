import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
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

  const top100Films = [
    { title: "The Shawshank Redemption", year: 1994 },
    { title: "The Godfather", year: 1972 },
    { title: "The Godfather: Part II", year: 1974 },
    { title: "The Dark Knight", year: 2008 },
    { title: "12 Angry Men", year: 1957 },
    { title: "Schindler's List", year: 1993 },
    { title: "Pulp Fiction", year: 1994 },
  ];

  return (
    <div className="flex-col mb-16">
      <div>
        <Autocomplete
          // id="highlights-demo"
          sx={{ width: 250 }}
          options={top100Films}
          getOptionLabel={(option) => `${option.title}, ${option.year}`}
          renderInput={(params) => (
            <TextField {...params} label="Filter by city" margin="normal" />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(option.title, inputValue, {
              insideWords: true,
            });
            const parts = parse(option.title, matches);

            return (
              <li {...props}>
                <div>
                  {parts.map((part, index) => (
                    <span
                      key={index}
                      style={{
                        fontWeight: part.highlight ? 700 : 400,
                      }}
                    >
                      {part.text}
                    </span>
                  ))}
                </div>
              </li>
            );
          }}
        />

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
