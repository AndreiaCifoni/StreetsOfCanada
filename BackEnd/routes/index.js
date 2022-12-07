const { Router } = require("express");
const router = Router();
const pool = require("../db/index");

//-------------------USERS------------------
// even if already exists, is showing message "user created"... put message "user already exists"
router.post("/users", (req, res) => {
  const { name, email, password } = req.body;
  pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
    [name, email, password],
    (error, results) => {
      if (error) console.log("Email already exists in the database");
      res.status(201).send("User created successfully!");
    }
  );
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
router.get("/activities", (req, res) => {
  pool.query("SELECT * FROM activities", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

router.post("/activities", (req, res) => {
  const { title, description, photo, user_id } = req.body;
  //check if title already exists
  pool.query(
    "SELECT * FROM activities WHERE title = $1",
    [title],
    (error, results) => {
      if (results.rows.length) {
        res.send("Activity already exists!");
      }
      //query to post user
      pool.query(
        "INSERT INTO activities (title, description, photo, user_id) VALUES ($1, $2, $3, $4)",
        [title, description, photo, user_id],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Activity created successfully!");
        }
      );
    }
  );
});

router.get("/activities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(
    "SELECT * FROM activities WHERE id = $1",
    [id],
    (error, results) => {
      if (error) throw error;
      res.status(200).json(results.rows);
    }
  );
});

router.put("/activities/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, photo, date_created } = req.body;
  //check if id exists...
  pool.query(
    "SELECT * FROM activities WHERE id = $1",
    [id],
    (error, results) => {
      const noActivityFound = !results.rows.length;
      if (noActivityFound) {
        res.send("Activity does not exist in the database");
      }
      pool.query(
        "UPDATE activities SET title = $2, description = $3, photo = $4, date_created = $5  WHERE id = $1",
        [id, title, description, photo, date_created],
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
    "SELECT * FROM activities WHERE id = $1",
    [id],
    (error, results) => {
      const noActivityFound = !results.rows.length;
      if (noActivityFound) {
        res.send("No activity found in database!");
      }
      pool.query(
        "DELETE FROM activities WHERE id = $1",
        [id],
        (error, results) => {
          if (error) throw error;
          res.status(200).send("Activity removed successfully!");
        }
      );
    }
  );
});

module.exports = router;
