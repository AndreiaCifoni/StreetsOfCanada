const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const pool = require("../db/pool");
const db = require("../db/index");

//-------------------USERS------------------

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await db.createUser(username, email, hashedPassword);
    if (user === null) throw `Couldn't create user`;

    res.status(201).send({ error: false });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: "Couldn't register" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.getUserByUsername(username);
    if (user === null) throw `Couldn't get username`;

    const hashedPassword = user.password;
    if (!bcrypt.compareSync(password, hashedPassword)) throw `Wrong password`;

    const sessionId = uuidv4();
    const newSession = await db.createSession(sessionId, user.user_id);
    if (newSession === null) throw `Couldn't create session`;

    res.cookie("sessionId", sessionId);

    res.status(201).send({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("Couldn't login");
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { sessionId } = req.cookies;
    await db.deleteSession(sessionId);

    res.clearCookie("sessionId");

    res.status(200).send({ error: false });
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: true, message: `Couldn't logout.` });
  }
});

//-------------------ACTIVITIES------------------

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
        "SELECT users.user_id, username, email FROM users LEFT JOIN activities ON activities.user_id = users.user_id  WHERE activity_id = $1",
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
  try {
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
    const insertCity = await pool.query(
      "INSERT INTO cities (name, province_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [city_name, province_id]
    );
    const getCityId = await pool.query(
      "SELECT * FROM cities WHERE name = $1 AND province_id = $2",
      [city_name, province_id]
    );

    const fullAddress = `${address}, ${city_name}, ${province_id}`;

    const getLatLong = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${fullAddress}&format=json`
    );
    const latLongData = await getLatLong.json();
    const latitude = latLongData[0].lat;
    const longitude = latLongData[0].lon;

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
      "SELECT users.user_id, username, email FROM users LEFT JOIN activities ON activities.user_id = users.user_id  WHERE activity_id = $1",
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
    const deleteReviews = await pool.query(
      "DELETE FROM reviews WHERE activity_id = $1",
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

//-------------------REVIEWS------------------

router.get("/activities/:id/reviews", async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const allReviewsByActivity = await db.getReviewsByActivity(id);

    const allReviewsIds = allReviewsByActivity.map((review) => {
      return review.review_id;
    });

    const activityReviews = allReviewsIds.map(async (reviewId) => {
      const userInfo = await db.getUserByReviewId(reviewId);

      const getReview = await db.getSingleReview(reviewId);

      getReview.user = userInfo;

      return getReview;
    });

    const results = await Promise.all(activityReviews);

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.post("/activities/:id/reviews", async (req, res) => {
  try {
    const activity_id = parseInt(req.params.id);
    const { review, rating } = req.body;
    const { sessionId } = req.cookies;

    const user = await db.getUserBySession(sessionId);

    if (user === null) throw `Couldn't get user with given session.`;

    const newReview = await db.createReview(
      user.user_id,
      activity_id,
      review,
      rating
    );
    newReview.user = user;
    res.status(201).json(newReview);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

// router.get("/reviews/:id", async (req, res) => {
//   const id = parseInt(req.params.id);
//   try {
//     const results = await pool.query(
//       "SELECT * FROM reviews WHERE review_id = $1",
//       [id]
//     );
//     const getUserInfo = await pool.query(
//       "SELECT users.user_id, username, email FROM users LEFT JOIN reviews ON reviews.user_id = users.user_id  WHERE review_id = $1",
//       [id]
//     );
//     const userInfo = getUserInfo.rows[0];
//     results.rows[0].user = userInfo;
//     res.status(200).json(results.rows);
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// });

router.put("/reviews/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { review, rating } = req.body;

    //****this part not working!!!!!
    // const { sessionId } = req.cookies;

    // const userByReview = await db.getUserByReviewId(id);
    // const userBySession = await db.getUserBySession(sessionId);

    // if (
    //   userByReview.user_id !== userBySession.user_id ||
    //   userBySession.user_id === undefined
    // )
    //   throw "Only the owner of the review can edit!";

    const results = await db.updateReview(id, review, rating);
    res.status(200).send("Review updated successfully!");
  } catch (error) {
    console.log(error);
    throw error;
  }
});

router.delete("/reviews/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await db.deleteReview(id);
    res.status(200).send("Review removed successfully!");
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

//------------------PROVINCE------------------
router.get("/provinces", async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM provinces");
    res.status(200).json(results.rows);
  } catch (error) {
    console.log(error);
    throw error;
  }
});

module.exports = router;
