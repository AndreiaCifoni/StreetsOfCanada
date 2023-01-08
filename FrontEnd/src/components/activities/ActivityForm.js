import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const ActivityForm = ({ activity, setActivity, onSubmitActivity }) => {
  const [tags, setTags] = useState([]);

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

  const onTagsAutocomplete = (event, newValue) => {
    const allTags = newValue.map((tag) => {
      return tag.tags_id;
    });
    setActivity({ ...activity, tags_ids: allTags });
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
          {/* <input
            type=""
            value={activity.tag}
            onChange={(e) => setActivity({ ...activity, tag: e.target.value })}
          /> */}
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
          <label>Province</label>
          <input
            type=""
            value={activity.province}
            onChange={(e) =>
              setActivity({ ...activity, province_id: e.target.value })
            }
          />
        </div>
        <div>
          <label>Photo</label>
          <input
            type=""
            value={activity.photo}
            onChange={(e) =>
              setActivity({ ...activity, photo: e.target.value })
            }
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            type=""
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
