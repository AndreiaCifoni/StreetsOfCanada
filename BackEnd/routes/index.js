const { Router } = require("express");
const router = Router();
const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../db/index");

//-------------------USERS------------------

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = await db.createUser(username, email, hashedPassword);
    if (user === null) throw `Could not create user`;

    res.status(201).json({ error: false, message: "Registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not register" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await db.getUserByUsername(username);
    if (user === null) throw `Could not get username`;

    const hashedPassword = user.password;
    if (!bcrypt.compareSync(password, hashedPassword)) throw `Wrong password`;

    const sessionId = uuidv4();

    const newSession = await db.createSession(sessionId, user.user_id);

    if (newSession === null) throw `Could not create session`;

    res.cookie("sessionId", sessionId);

    res.status(201).json({
      user_id: user.user_id,
      username: user.username,
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not login" });
  }
});

router.post("/logout", async (req, res) => {
  try {
    const { sessionId } = req.cookies;

    await db.deleteSession(sessionId);

    res.clearCookie("sessionId");

    res.status(200).json({ error: false, message: "Logout successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: `Could not logout.` });
  }
});

//-------------------ACTIVITIES------------------

router.get("/activities", async (req, res) => {
  try {
    const city_name = req.query.city;
    const tag_name = req.query.tags;

    const activitiesIdsByQuery = await db.getActivitiesIdByQuery(
      city_name,
      tag_name
    );

    const allActivitiesIds = activitiesIdsByQuery.map((activity) => {
      return activity.activity_id;
    });

    const activityInfo = allActivitiesIds.map(async (id) => {
      return await db.getActivityInfo(id);
    });

    const results = await Promise.all(activityInfo);

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not get activities" });
  }
});

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

    const insertCity = await db.createCity(city_name, province_id);
    const cityId = await db.getCityId(city_name, province_id);

    const fullAddress = `${address}, ${city_name}, ${province_id}`;

    const getLatLong = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${fullAddress}&format=json`
    );
    const latLongData = await getLatLong.json();
    const latitude = latLongData[0].lat;
    const longitude = latLongData[0].lon;

    const newActivity = await db.createActivity(
      title,
      description,
      address,
      latitude,
      longitude,
      photo,
      user_id,
      cityId
    );

    const insertPromises = tags_ids.map((tag_id) => {
      return db.createActivityTags(tag_id, newActivity.activity_id);
    });
    await Promise.all(insertPromises);

    res.status(201).json(newActivity);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Activity not posted" });
  }
});

router.get("/activities/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const activityById = await db.getActivityInfo(id);

    res.status(200).json(activityById);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not get activity" });
  }
});

router.put("/activities/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
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

    const { sessionId } = req.cookies;

    if (!sessionId) throw "User not login";
    const userBySession = await db.getUserBySession(sessionId);
    if (user_id !== userBySession?.user_id)
      throw "Only the owner of the activity can edit!";

    const insertCity = await db.createCity(city_name, province_id);
    const cityId = await db.getCityId(city_name, province_id);
    const fullAddress = `${address}, ${city_name}, ${province_id}`;
    const getLatLong = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${fullAddress}&format=json`
    );
    const latLongData = await getLatLong.json();
    const latitude = latLongData[0].lat;
    const longitude = latLongData[0].lon;

    const updateActivity = await db.getUpdateActivity(
      id,
      title,
      description,
      address,
      latitude,
      longitude,
      photo,
      cityId,
      tags_ids
    );

    res.status(201).json(updateActivity);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Activity not updated" });
  }
});

router.delete("/activities/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { sessionId } = req.cookies;

    if (!sessionId) throw "User not login";

    const activityInfoById = await db.getActivityInfo(id);
    const userByActivityId = activityInfoById.user.user_id;
    const userBySession = await db.getUserBySession(sessionId);
    console.log(userByActivityId);
    if (userByActivityId !== userBySession?.user_id)
      throw "Only the owner of the activity can delete!";

    await db.deleteActivity(id);

    res
      .status(200)
      .json({ error: false, message: "Activity removed successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Activity not deleted" });
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
    res.status(400).json({ error: true, message: "Could not get review" });
  }
});

router.post("/activities/:id/reviews", async (req, res) => {
  try {
    const activity_id = parseInt(req.params.id);
    const { review, rating } = req.body;
    const { sessionId } = req.cookies;

    const user = await db.getUserBySession(sessionId);

    if (user === null) throw `Could not get user with given session.`;

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
    res.status(400).json({ error: true, message: "Could not create review" });
  }
});

router.put("/reviews/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { review, rating } = req.body;

    const { sessionId } = req.cookies;

    if (!sessionId) throw "User not login";
    const userByReview = await db.getUserByReviewId(id);
    const userBySession = await db.getUserBySession(sessionId);
    if (userByReview?.user_id !== userBySession?.user_id)
      throw "Only the owner of the review can edit!";

    const results = await db.updateReview(id, review, rating);
    res
      .status(201)
      .json({ error: false, message: "Review updated successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not edit review" });
  }
});

router.delete("/reviews/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { sessionId } = req.cookies;

    if (!sessionId) throw "User not login";
    const userByReview = await db.getUserByReviewId(id);
    const userBySession = await db.getUserBySession(sessionId);
    if (userByReview?.user_id !== userBySession?.user_id)
      throw "Only the owner of the review can delete!";

    await db.deleteReview(id);
    res
      .status(200)
      .json({ error: false, message: "Review removed successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Review not deleted" });
  }
});

//-------------------TAGS------------------

router.get("/tags", async (req, res) => {
  try {
    const tags = await db.getAllTags();
    res.status(200).json(tags);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not get tags" });
  }
});

//------------------CITY------------------
router.get("/cities", async (req, res) => {
  try {
    const cities = await db.getAllCities();
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not get cities" });
  }
});

//------------------PROVINCE------------------
router.get("/provinces", async (req, res) => {
  try {
    const provinces = await db.getAllProvinces();
    res.status(200).json(provinces);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true, message: "Could not get provinces" });
  }
});

module.exports = router;
