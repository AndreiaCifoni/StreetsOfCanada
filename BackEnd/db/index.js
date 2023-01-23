const pool = require("./pool");

const createUser = async (username, email, password) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return rows.length >= 1 ? rows[0] : null;
};

const getUserByUsername = async (username) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [
    username,
  ]);
  return rows.length >= 1 ? rows[0] : null;
};

const createSession = async (sessionId, userId) => {
  const { rows } = await pool.query(
    "INSERT INTO sessions (session_id, user_id) VALUES ($1, $2) RETURNING *",
    [sessionId, userId]
  );
  return rows.length >= 1 ? rows[0] : null;
};

const deleteSession = async (sessionId) => {
  const { rows } = await pool.query(
    "DELETE FROM sessions WHERE session_id = $1",
    [sessionId]
  );
  return null;
};

const getUserBySession = async (sessionId) => {
  const getUserIdBySession = await pool.query(
    "SELECT * FROM sessions WHERE session_id = $1",
    [sessionId]
  );
  const userId = getUserIdBySession.rows[0].user_id;
  const userResult = await pool.query(
    "SELECT users.user_id, username, email FROM users WHERE user_id = $1",
    [userId]
  );

  return userResult.rows.length >= 1 ? userResult.rows[0] : null;
};

const createReview = async (userId, activity_id, review, rating) => {
  const { rows } = await pool.query(
    "INSERT INTO reviews (user_id, activity_id, review, rating ) VALUES ($1, $2, $3, $4) RETURNING *",
    [userId, activity_id, review, rating]
  );
  return rows.length >= 1 ? rows[0] : null;
};

const getReviewsByActivity = async (activityId) => {
  const { rows } = await pool.query(
    "SELECT review_id FROM reviews WHERE activity_id = $1",
    [activityId]
  );
  return rows;
};

const getUserByReviewId = async (reviewId) => {
  const { rows } = await pool.query(
    "SELECT users.user_id, username, email FROM users LEFT JOIN reviews ON reviews.user_id = users.user_id  WHERE review_id = $1",
    [reviewId]
  );
  return rows.length >= 1 ? rows[0] : null;
};

const getSingleReview = async (reviewId) => {
  const { rows } = await pool.query(
    "SELECT * FROM reviews WHERE review_id = $1",
    [reviewId]
  );
  return rows.length >= 1 ? rows[0] : null;
};

const updateReview = async (id, review, rating) => {
  const { rows } = await pool.query(
    "UPDATE reviews SET review = $2, rating = $3  WHERE review_id = $1",
    [id, review, rating]
  );
  return null;
};

const deleteReview = async (id) => {
  const { rows } = await pool.query(
    "DELETE FROM reviews WHERE review_id = $1",
    [id]
  );
  return null;
};

const createCity = async (city_name, province_id) => {
  const { rows } = await pool.query(
    "INSERT INTO cities (name, province_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [city_name, province_id]
  );
  return null;
};

const getCityId = async (city_name, province_id) => {
  const { rows } = await pool.query(
    "SELECT * FROM cities WHERE name = $1 AND province_id = $2",
    [city_name, province_id]
  );
  return rows.length >= 1 ? rows[0].city_id : null;
};

const createActivity = async (
  title,
  description,
  address,
  latitude,
  longitude,
  photo,
  user_id,
  cityId
) => {
  const { rows } = await pool.query(
    "INSERT INTO activities (title, description, address, latitude, longitude, photo, user_id, city_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
    [title, description, address, latitude, longitude, photo, user_id, cityId]
  );
  return rows.length >= 1 ? rows[0] : null;
};

const createActivityTags = async (tag_id, activityId) => {
  const { rows } = await pool.query(
    "INSERT INTO activities_tags (tags_id, activity_id) VALUES ($1, $2)",
    [tag_id, activityId]
  );
};

const getActivitiesIdByQuery = async (city_name, tag_name) => {
  const { rows } = city_name
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

  return rows.length >= 1 ? rows : null;
};

const getActivityInfo = async (id) => {
  const getTagsNamesByActivity = await pool.query(
    "SELECT name FROM activities_tags LEFT JOIN tags ON activities_tags.tags_id = tags.tags_id  WHERE activity_id = $1",
    [id]
  );
  const allTagsNameByActivity = getTagsNamesByActivity.rows.map((tag) => {
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
  getActivity.rows[0].tags = allTagsNameByActivity;
  getActivity.rows[0].user = userInfo;
  getActivity.rows[0].city = cityName;

  return getActivity.rows[0];
};

const getUpdateActivity = async (
  id,
  title,
  description,
  address,
  latitude,
  longitude,
  photo,
  cityId
) => {
  const { rows } = await pool.query(
    "UPDATE activities SET title = $2, description = $3, address = $4, latitude = $5, longitude = $6, photo = $7, city_id = $8  WHERE activity_id = $1 RETURNING *",
    [id, title, description, address, latitude, longitude, photo, cityId]
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
  return rows.length >= 1 ? rows[0] : null;
};

const deleteActivity = async (id) => {
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
  return null;
};

module.exports = {
  createUser,
  getUserByUsername,
  createSession,
  deleteSession,
  getUserBySession,
  createReview,
  getReviewsByActivity,
  getUserByReviewId,
  getSingleReview,
  updateReview,
  deleteReview,
  createCity,
  getCityId,
  createActivity,
  createActivityTags,
  getActivitiesIdByQuery,
  getActivityInfo,
  getUpdateActivity,
  deleteActivity,
};
