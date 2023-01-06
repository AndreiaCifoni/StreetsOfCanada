const { Router } = require("express");
const router = Router();
const pool = require("../db/index");
const fetch = require("node-fetch");

//-------------------USERS------------------

router.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );
    res.status(201).send("User created successfully!");
  } catch (error) {
    console.log(error);
    res.status(400).send("Email already exists in the database");
  }
});

//route for login - not tested... sessions??
// router.post("/sessions", (req, res) => {
//   const { name, password } = req.body;
//   pool.query(
//     "SELECT * FROM users WHERE name = $1 AND password = $2",
//     [name, password],
//     (error, results) => {
//       if (error) throw error;
//       res.status(200).send(`Hello ${name}`).json(results.rows);
//     }
//   );
// });

//route for logout - to be build ... sessions??
// router.delete("/sessions", (req, res) => {
// });

//-------------------ACTIVITIES------------------
//SELECT * FROM activities LEFT JOIN activities_tags ON activities.activity_id = activities_tags. activity_id WHERE activities.activity_id = $1
//SELECT * FROM activities LEFT JOIN activities_tags ON activities.activity_id = activities_tags. activity_id;

router.get("/activities", async (req, res) => {
  try {
    const city_name = req.query.city;
    const tag_name = req.query.tags;

    const getActivitiesIds = city_name
      ? await pool.query(
          "SELECT activity_id FROM activities LEFT JOIN cities ON activities.city_id = cities.city_id WHERE cities.name = $1 ",
          [city_name]
        )
      : tag_name
      ? await pool.query(
          "SELECT activities.activity_id FROM activities JOIN activities_tags ON activities.activity_id = activities_tags.activity_id JOIN tags ON activities_tags.tags_id = tags.tags_id  WHERE tags.name = $1 ",
          [tag_name]
        )
      : await pool.query("SELECT activity_id FROM activities");

    console.log(req.query);
    const activitiesIds = getActivitiesIds.rows.map((activity) => {
      return activity.activity_id;
    });
    const getActivityAndTags = activitiesIds.map(async (id) => {
      const getTagsNames = await pool.query(
        "SELECT name FROM activities_tags LEFT JOIN tags ON activities_tags.tags_id = tags.tags_id  WHERE activity_id = $1",
        [id]
      );
      const tags = getTagsNames.rows.map((tag) => {
        return tag.name;
      });
      const getUserInfo = await pool.query(
        "SELECT users.user_id, name, email FROM users LEFT JOIN activities ON activities.user_id = users.user_id  WHERE activity_id = $1",
        [id]
      );
      const userInfo = getUserInfo.rows[0];
      const getCityName = await pool.query(
        "SELECT cities.city_id, name, cities.province_id FROM cities LEFT JOIN activities ON activities.city_id = cities.city_id  WHERE activity_id = $1",
        [id]
      );
      const cityName = getCityName.rows[0];
      const getActivity = await pool.query(
        "SELECT * FROM activities WHERE activity_id = $1",
        [id]
      );
      getActivity.rows[0].tags = tags;
      getActivity.rows[0].user = userInfo;
      getActivity.rows[0].city = cityName;
      return getActivity.rows[0];
    });
    const results = await Promise.all(getActivityAndTags);
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// router.post("/activities", (req, res) => {
//   const { title, description, photo, user_id, tags_ids } = req.body;
//   pool.query(
//     "INSERT INTO activities (title, description, photo, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
//     [title, description, photo, user_id],
//     (error, results) => {
//       if (error) throw error;
//       tags_ids.forEach((tag_id) => {
//         pool.query(
//           "INSERT INTO activities_tags (tags_id, activity_id) VALUES ($1, $2)",
//           [tag_id, activity_id]
//         );
//       });
//       res.status(201).json(results.rows[0]);
//     }
//   );
// });

router.post("/activities", async (req, res) => {
  const {
    title,
    description,
    address,
    photo,
    user_id,
    tags_ids,
    city_name,
    province_id,
  } = req.body;
  try {
    const insertCity = await pool.query(
      "INSERT INTO cities (name, province_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [city_name, province_id]
    );
    const getCityId = await pool.query(
      "SELECT * FROM cities WHERE name = $1 AND province_id = $2",
      [city_name, province_id]
    );

    const fullAddress = `${address}, ${city_name}, ${province_id}`;

    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${fullAddress}&format=json`
    );
    const citiesData = await response.json();
    console.log(citiesData[0]);

    const results = await pool.query(
      "INSERT INTO activities (title, description, address, latitude, longitude, photo, user_id, city_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        title,
        description,
        address,
        latitude,
        longitude,
        photo,
        user_id,
        getCityId.rows[0].city_id,
      ]
    );
    const insertPromises = tags_ids.map((tag_id) => {
      return pool.query(
        "INSERT INTO activities_tags (tags_id, activity_id) VALUES ($1, $2)",
        [tag_id, results.rows[0].activity_id]
      );
    });
    await Promise.all(insertPromises);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send("Activity not posted");
  }
});

router.get("/activities/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const getTagsNames = await pool.query(
      "SELECT name FROM activities_tags LEFT JOIN tags ON activities_tags.tags_id = tags.tags_id  WHERE activity_id = $1",
      [id]
    );
    const tags = getTagsNames.rows.map((tag) => {
      return tag.name;
    });
    const getUserInfo = await pool.query(
      "SELECT users.user_id, name, email FROM users LEFT JOIN activities ON activities.user_id = users.user_id  WHERE activity_id = $1",
      [id]
    );
    const userInfo = getUserInfo.rows[0];
    const getCityName = await pool.query(
      "SELECT cities.city_id, name, cities.province_id FROM cities LEFT JOIN activities ON activities.city_id = cities.city_id  WHERE activity_id = $1",
      [id]
    );
    const cityName = getCityName.rows[0];
    const getActivity = await pool.query(
      "SELECT * FROM activities WHERE activity_id = $1",
      [id]
    );
    getActivity.rows[0].tags = tags;
    getActivity.rows[0].user = userInfo;
    getActivity.rows[0].city = cityName;
    console.log(userInfo);
    res.status(200).json(getActivity.rows[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.put("/activities/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const {
    title,
    description,
    address,
    latitude,
    longitude,
    photo,
    city_id,
    tags_ids,
  } = req.body;
  try {
    const results = await pool.query(
      "UPDATE activities SET title = $2, description = $3, address = $4, latitude = $5, longitude = $6, photo = $7, city_id = $8  WHERE activity_id = $1 RETURNING *",
      [id, title, description, address, latitude, longitude, photo, city_id]
    );
    const deleteTags = await pool.query(
      "DELETE FROM activities_tags WHERE activity_id = $1",
      [id]
    );
    const insertTags = tags_ids.map((tag_id) => {
      return pool.query(
        "INSERT INTO activities_tags (tags_id, activity_id) VALUES ($1, $2)",
        [tag_id, id]
      );
    });
    await Promise.all(insertTags);
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    res.status(400).send("Activity not updated");
  }
});

router.delete("/activities/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const deleteComments = await pool.query(
      "DELETE FROM comments WHERE activity_id = $1",
      [id]
    );
    const deleteTags = await pool.query(
      "DELETE FROM activities_tags WHERE activity_id = $1",
      [id]
    );
    const results = await pool.query(
      "DELETE FROM activities WHERE activity_id = $1",
      [id]
    );
    res.status(200).send("Activity removed successfully!");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//-------------------COMMENTS------------------

router.get("/activities/:id/comments", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(
      "SELECT * FROM comments WHERE activity_id = $1",
      [id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.post("/activities/:id/comments", async (req, res) => {
  const activity_id = parseInt(req.params.id);
  const { user_id, comment, rating } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO comments (user_id, activity_id, comment, rating ) VALUES ($1, $2, $3, $4) RETURNING *",
      [user_id, activity_id, comment, rating]
    );
    res.status(201).json(results.rows[0]);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.get("/comments/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const results = await pool.query(
      "SELECT * FROM comments WHERE comments_id = $1",
      [id]
    );
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.put("/comments/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { comment, rating } = req.body;
  try {
    const results = await pool.query(
      "UPDATE comments SET comment = $2, rating = $3  WHERE comments_id = $1",
      [id, comment, rating]
    );
    res.status(200).send("Comment updated successfully!");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.delete("/comments/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    // const checkId = await pool.query(
    //   "SELECT * FROM comments WHERE comments_id = $1",
    //   [id]
    // );
    const results = await pool.query(
      "DELETE FROM comments WHERE comments_id = $1",
      [id]
    );
    res.status(200).send("Comment removed successfully!");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//-------------------TAGS------------------

router.get("/tags", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM tags");
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

//------------------CITY------------------
router.get("/cities", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM cities");
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = router;
