import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const ActivityForm = ({ activity, setActivity, onSubmitActivity }) => {
  const [tags, setTags] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const response = await fetch("/tags");
        const tagsData = await response.json();
        const autocompleteTags = tagsData.map((tag) => {
          const listOfTags = { tags_id: tag.tags_id, name: tag.name };
          return listOfTags;
        });

        if (response.status !== 200) throw Error("Could not get tags");

        setTags(autocompleteTags);
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

        setCities(autocompleteCities);
      } catch (error) {
        alert(error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch("/provinces");
        const provincesData = await response.json();
        const autocompleteProvinces = provincesData.map((province) => {
          return province.province_id;
        });

        if (response.status !== 200) throw Error("Could not get provices");

        setProvinces(autocompleteProvinces);
      } catch (error) {
        alert(error);
      }
    };
    fetchProvinces();
  }, []);

  const onTagsAutocomplete = (event, newValue) => {
    const allTags = newValue.map((tag) => {
      return tag.tags_id;
    });
    setActivity({ ...activity, tags_ids: allTags });
  };

  const onCitiesAutocomplete = (event, newValue) => {
    setActivity({ ...activity, city_name: newValue });
  };

  const onProvAutocomplete = (event, newValue) => {
    setActivity({ ...activity, province_id: newValue });
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitActivity(activity);
        }}
      >
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
          <Autocomplete
            //defaultValue={activity.tags}
            id="size-small-standard"
            size="small"
            className=" w-2/3 "
            multiple
            options={tags}
            getOptionLabel={(tags) => tags.name}
            onChange={onTagsAutocomplete}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="filterSelectedOptions"
                placeholder="Favorites"
              />
            )}
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

          <Autocomplete
            //defaultValue={activity.city.name}
            id="size-small-standard"
            size="small"
            className=" w-4/12 "
            freeSolo
            onChange={onCitiesAutocomplete}
            onInputChange={onCitiesAutocomplete}
            options={cities.map((option) => option.name)}
            renderInput={(params) => (
              <TextField {...params} label="Choose a city" />
            )}
          />
          <label>Province</label>
          <Autocomplete
            //defaultValue={activity.city.province_id}
            disablePortal
            id="size-small-standard"
            size="small"
            className=" w-2/12 "
            options={provinces}
            onChange={onProvAutocomplete}
            renderInput={(params) => <TextField {...params} label="Province" />}
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            type="text"
            value={activity.photo}
            onChange={(e) =>
              setActivity({ ...activity, photo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type="text"
            value={activity.description}
            onChange={(e) =>
              setActivity({ ...activity, description: e.target.value })
            }
          />
        </div>
        <input
          className="mt-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
          type="submit"
          value="Submit"
        />
      </form>
    </div>
  );
};

export default ActivityForm;
