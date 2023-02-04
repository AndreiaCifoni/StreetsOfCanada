import React, { useState, useEffect } from "react";
// import Dropdown from "react-dropdown";
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

  const fetchActivity = async () => {
    try {
      const response = await fetch("/activities");
      const data = await response.json();

      if (response.status !== 200) throw Error("Could not get activities");

      setActivityList(data);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    fetchActivity();
  }, []);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/tags");
        const tagsData = await response.json();
        const dropdownTags = tagsData.map((tag) => {
          const listOfTags = { value: tag.name, label: tag.name };
          return listOfTags;
        });

        if (response.status !== 200) throw Error("Could not get tags");

        setTags([...tags, ...dropdownTags]);
      } catch (error) {
        alert(error);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("/cities");
        const citiesData = await response.json();
        const autocompleteCities = citiesData.map((city) => {
          const listCities = { name: city.name, province_id: city.province_id };
          return listCities;
        });

        if (response.status !== 200) throw Error("Could not get cities");

        setCities([...cities, ...autocompleteCities]);
      } catch (error) {
        alert(error);
      }
    };
    fetchCities();
  }, []);

  // const onDropdownChange = async (option) => {
  //   try {
  //     const paramValue = option.value;
  //     const response = await fetch(
  //       "/activities?" +
  //         new URLSearchParams({
  //           tags: paramValue,
  //         })
  //     );
  //     const data = await response.json();
  //     setActivityList(data);
  //   } catch (error) {
  //     alert(error);
  //   }
  // };

  const onFilterByTag = async (event, newValue) => {
    try {
      const paramValue = newValue.value;
      const response = await fetch(
        "/activities?" +
          new URLSearchParams({
            tags: paramValue,
          })
      );
      const data = await response.json();
      setActivityList(data);
    } catch (error) {
      alert(error);
    }
  };

  const onAutocomplete = async (event, newValue) => {
    try {
      setCityValue(newValue);
      const paramValue = newValue.name;
      if (paramValue === "None") {
        fetchActivity();
      } else {
        const response = await fetch(
          "/activities?" +
            new URLSearchParams({
              city: paramValue,
            })
        );
        const data = await response.json();
        setActivityList(data);
      }
    } catch (error) {
      alert(error);
    }
  };

  if (!activityList) {
    return <div>Loading</div>;
  }

  return (
    <div className="flex-col mb-16">
      <div className="flex md:flex-col md:items-end justify-end mr-2 gap-2 mb-4 ">
        <Autocomplete
          id="size-small-standard"
          size="small"
          className="w-1/6 lg:w-1/4 md:w-1/2 "
          onChange={onAutocomplete}
          options={cities}
          getOptionLabel={(option) => `${option.name} ${option.province_id}`}
          renderInput={(params) => (
            <TextField {...params} label="Filter by city" className="" />
          )}
        />

        <Autocomplete
          id="size-small-standard"
          size="small"
          className="w-1/6 lg:w-1/4 md:w-1/2"
          onChange={onFilterByTag}
          options={tags}
          renderInput={(params) => (
            <TextField {...params} label="Filter by tag" />
          )}
        />

        {/* <Dropdown
          options={tags}
          onChange={onDropdownChange}
          placeholder="Filter by tag"
        /> */}
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
            description={activity.description.substring(0, 150) + "..."}
          />
        );
      })}
    </div>
  );
};

export default ActivityList;
