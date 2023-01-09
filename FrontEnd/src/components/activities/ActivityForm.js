import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const ActivityForm = ({ activity, setActivity, onSubmitActivity }) => {
  const [tags, setTags] = useState([]);
  // const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const response = await fetch("http://localhost:3000/tags");
      const tagsData = await response.json();
      const autocompleteTags = tagsData.map((tag) => {
        const listOfTags = { tags_id: tag.tags_id, name: tag.name };
        return listOfTags;
      });
      setTags(autocompleteTags);
    };
    fetchTags();
  }, []);

  // useEffect(() => {
  //   const fetchCities = async () => {
  //     const response = await fetch("http://localhost:3000/cities");
  //     const citiesData = await response.json();
  //     const autocompleteCities = citiesData.map((city) => {
  //       const listCities = { name: city.name, province_id: city.province_id };
  //       return listCities;
  //     });
  //     setCities(autocompleteCities);
  //   };
  //   fetchCities();
  // }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      const response = await fetch("http://localhost:3000/provinces");
      const provincesData = await response.json();
      const autocompleteProvinces = provincesData.map((province) => {
        return province.province_id;
      });
      setProvinces(autocompleteProvinces);
    };
    fetchProvinces();
  }, []);

  const onTagsAutocomplete = (event, newValue) => {
    const allTags = newValue.map((tag) => {
      return tag.tags_id;
    });
    setActivity({ ...activity, tags_ids: allTags });
  };

  // const onCitiesAutocomplete = (event, newValue) => {
  //   console.log(newValue);
  //   setActivity({ ...activity, city_name: newValue });
  // };

  const onProvAutocomplete = (event, newValue) => {
    console.log(newValue);
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
            id="size-small-standard"
            size="small"
            className=" w-4/12 "
            multiple
            options={tags}
            getOptionLabel={(tags) => tags.name}
            onChange={onTagsAutocomplete}
            //defaultValue={[tags[1]]}
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
          <input
            type=""
            value={activity.city}
            onChange={(e) =>
              setActivity({ ...activity, city_name: e.target.value })
            }
          />
          {/* <Autocomplete
            id="size-small-standard"
            size="small"
            className=" w-4/12 "
            freeSolo
            onChange={onCitiesAutocomplete}
            options={cities.map((option) => option.name)}
            renderInput={(params) => <TextField {...params} label="freeSolo" />}
          /> */}
          <label>Province</label>
          <Autocomplete
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
        <input type="submit" value="Save" />
      </form>
    </div>
  );
};

export default ActivityForm;
