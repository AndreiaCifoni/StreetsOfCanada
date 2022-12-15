const { Router } = require("express");
const router = Router();
const pool = require("../db/index");

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
//SELECT * FROM activities LEFT JOIN activities_tags ON activities.activity_id = activities_tags. activity_id;
router.get("/activities", (req, res) => {
  pool.query("SELECT * FROM activities", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
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
  const { title, description, photo, user_id, tags_ids } = req.body;
  try {
    const results = await pool.query(
      "INSERT INTO activities (title, description, photo, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
      [title, description, photo, user_id]
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

router.get("/activities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM activities WHERE activity_id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
});

router.put("/activities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { activity_id, title, description, photo } = req.body;
  //check if id exists...
  pool.query(
    "SELECT * FROM activities WHERE activity_id = $1",
    [id],
    (error, results) => {
      const noActivityFound = !results.rows.length;
      if (noActivityFound) {
        res.send("Activity does not exist in the database");
      }
      pool.query(
        "UPDATE activities SET title = $2, description = $3, photo = $4  WHERE activity_id = $1",
        [activity_id, title, description, photo],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Activity updated successfully!");
        }
      );
    }
  );
});

router.delete("/activities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM activities WHERE activity_id = $1",
    [id],
    (error, results) => {
      const noActivityFound = !results.rows.length;
      if (noActivityFound) {
        res.status(404).send("No activity found in database!");
      }
      pool.query(
        "DELETE FROM activities WHERE activity_id = $1",
        [id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Activity removed successfully!");
        }
      );
    }
  );
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

// router.put("/comments/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   const { comment, rating } = req.body;
//   //check if id exists...
//   pool.query(
//     "SELECT * FROM comments WHERE comments_id = $1",
//     [id],
//     (error, results) => {
//       const noCommentFound = !results.rows.length;
//       if (noCommentFound) {
//         res.send("Comment does not exist in the database");
//       }
//       pool.query(
//         "UPDATE comments SET comment = $2, rating = $3  WHERE comments_id = $1",
//         [id, comment, rating],
//         (error, results) => {
//           if (error) throw error;
//           res.status(200).send("Comment updated successfully!");
//         }
//       );
//     }
//   );
// });

router.put("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { comment, rating } = req.body;
  //check if id exists...
  pool.query(
    "SELECT * FROM comments WHERE comments_id = $1",
    [id],
    (error, results) => {
      const noCommentFound = !results.rows.length;
      if (noCommentFound) {
        res.send("Comment does not exist in the database");
      }
      pool.query(
        "UPDATE comments SET comment = $2, rating = $3  WHERE comments_id = $1",
        [id, comment, rating],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Comment updated successfully!");
        }
      );
    }
  );
});

router.delete("/comments/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM comments WHERE comments_id = $1",
    [id],
    (error, results) => {
      const noCommentFound = !results.rows.length;
      if (noCommentFound) {
        res.status(400).send("No comment found in database!");
      }
      pool.query(
        "DELETE FROM comments WHERE comments_id = $1",
        [id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Activity removed successfully!");
        }
      );
    }
  );
});

//-------------------TAGS------------------

router.get("/tags", (req, res) => {
  pool.query("SELECT * FROM tags", (error, result) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

module.exports = router;
