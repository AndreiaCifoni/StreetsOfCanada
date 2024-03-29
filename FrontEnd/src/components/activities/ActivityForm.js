import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { apiURL } from "../../globalVariables";

const ActivityForm = ({
  activity,
  setActivity,
  onSubmitActivity,
  onClickCancelEditActivity,
  editForm,
}) => {
  const [tags, setTags] = useState([]);
  const [cities, setCities] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${apiURL}/tags`);
        const tagsData = await response.json();
        const autocompleteTags = tagsData.map((tag) => {
          const listOfTags = { tags_id: tag.tags_id, name: tag.name };
          return listOfTags;
        });

        if (response.status !== 200) throw Error("Could not get tags");

        setTags(autocompleteTags);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTags();
  }, []);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`${apiURL}/cities`);
        const citiesData = await response.json();
        const autocompleteCities = citiesData.map((city) => {
          const listCities = { name: city.name, province_id: city.province_id };
          return listCities;
        });

        if (response.status !== 200) throw Error("Could not get cities");

        setCities(autocompleteCities);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await fetch(`${apiURL}/provinces`);
        const provincesData = await response.json();
        const autocompleteProvinces = provincesData.map((province) => {
          return province.province_id;
        });

        if (response.status !== 200) throw Error("Could not get provices");

        setProvinces(autocompleteProvinces);
      } catch (error) {
        console.log(error)
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

  const activityTags = tags.filter((tag) =>
    activity.tags_ids.includes(tag.tags_id)
  );

  if (isLoading) {
    return <div>Loading</div>;
  }

  return (
    <div className="h-full flex mt-8 mx-16 lg:mx-8 pb-8 bg-indigo-100 rounded font-bold text-xl">
      <form
        className=" w-2/3 lg:w-10/12 mx-auto mt-8 py-8 px-12 lg:px-6 flex-col rounded bg-orange-50"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmitActivity(activity);
        }}
      >
        <div className="mb-6">
          <label className="mr-4">Title</label>
          <input
            className="pl-2 w-3/5 focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
            type="text"
            value={activity.title}
            onChange={(e) =>
              setActivity({ ...activity, title: e.target.value })
            }
          />
        </div>
        <div className="mb-6 flex items-center gap-4">
          <label>Tags</label>
          <Autocomplete
            size="small"
            className="w-3/4 "
            multiple
            defaultValue={activityTags}
            options={tags}
            getOptionLabel={(tags) => tags.name}
            onChange={onTagsAutocomplete}
            filterSelectedOptions
            renderInput={(params) => (
              <TextField
                {...params}
                label="Choose the tags"
                placeholder="Favorites"
              />
            )}
          />
        </div>
        <div className="mb-6">
          <h1 className="mb-2">Location</h1>
          <div className="ml-8 p-4 w-2/3 lg:w-10/12 border-indigo-200 border-2 border solid rounded">
            <div className="mb-4">
              <label className="mr-4">Address</label>
              <input
                className="pl-2 w-3/5 focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
                type=""
                value={activity.address}
                onChange={(e) =>
                  setActivity({ ...activity, address: e.target.value })
                }
              />
            </div>
            <div className="mb-4 flex items-center gap-4">
              <label>City</label>
              <Autocomplete
                id="size-small-standard"
                size="small"
                className=" w-3/5 "
                defaultValue={activity.city_name}
                freeSolo
                onChange={onCitiesAutocomplete}
                onInputChange={onCitiesAutocomplete}
                options={cities.map((option) => option.name)}
                renderInput={(params) => (
                  <TextField {...params} label="Choose a city" />
                )}
              />
            </div>
            <div className="flex items-center gap-4">
              <label>Province</label>
              <Autocomplete
                disablePortal
                id="size-small-standard"
                size="small"
                className=" w-3/5 "
                defaultValue={activity.province_id}
                options={provinces}
                onChange={onProvAutocomplete}
                renderInput={(params) => (
                  <TextField {...params} label="Province" />
                )}
              />
            </div>
          </div>
        </div>

        <div className="mb-6">
          <label className="mr-4">Photo</label>
          <input
            className="pl-2 w-3/5 focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
            type="text"
            value={activity.photo}
            onChange={(e) =>
              setActivity({ ...activity, photo: e.target.value })
            }
          />
        </div>
        <div className="flex items-center mb-14">
          <label className=" mr-4 ">Description</label>
          <textarea
            className="pl-2 w-3/5 h-32 focus:outline-indigo-700 border-indigo-200 border-2 border-solid rounded"
            type="text"
            value={activity.description}
            onChange={(e) =>
              setActivity({ ...activity, description: e.target.value })
            }
          />
        </div>
        <div>
          <input
            className="mt-4 mr-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
            type="submit"
            value="Submit"
          />

          <button
            className={
              editForm
                ? "mt-4 py-0.5 px-1.5 rounded border-solid border-2 border-indigo-400 hover:border-violet-400 hover:bg-violet-300 shadow"
                : "invisible"
            }
            onClick={onClickCancelEditActivity}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ActivityForm;
