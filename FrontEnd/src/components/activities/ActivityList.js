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
  const [cities, setCities] = useState([{ name: "None", province_id: "" }]);
  const [cityValue, setCityValue] = useState("");

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

  useEffect(() => {
    const fetchCities = async () => {
      const response = await fetch("http://localhost:3000/cities");
      const citiesData = await response.json();
      const autocompleteCities = citiesData.map((city) => {
        const listCities = { name: city.name, province_id: city.province_id };
        return listCities;
      });
      setCities([...cities, ...autocompleteCities]);
    };
    fetchCities();
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

  const onAutocomplete = async (event, newValue) => {
    setCityValue(newValue);
    const paramValue = newValue.name;
    if (paramValue === "None") {
      const response = await fetch("http://localhost:3000/activities");
      const data = await response.json();
      setActivityList(data);
    } else {
      const response = await fetch(
        "http://localhost:3000/activities?" +
          new URLSearchParams({
            city: paramValue,
          })
      );
      const data = await response.json();
      setActivityList(data);
    }
  };

  if (!activityList) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-col mb-16">
      <div>
        <Autocomplete
          id="size-small-standard"
          size="small"
          className=" w-2/12 "
          onChange={onAutocomplete}
          options={cities}
          getOptionLabel={(option) => `${option.name} ${option.province_id}`}
          renderInput={(params) => (
            <TextField {...params} label="Filter by city" className="" />
          )}
          renderOption={(props, option, { inputValue }) => {
            const matches = match(
              `${option.name} ${option.province_id}`,
              inputValue,
              {
                insideWords: true,
              }
            );
            const parts = parse(
              `${option.name} ${option.province_id}`,
              matches
            );

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
            province={activity.city.province_id}
            tags={activity.tags}
            description={activity.description.substring(0, 200) + "..."}
          />
        );
      })}
    </div>
  );
};

export default ActivityList;
