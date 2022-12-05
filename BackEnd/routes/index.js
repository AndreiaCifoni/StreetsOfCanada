const { Router } = require("express");
const router = Router();
const pool = require("../db/index");

//-------------------USERS------------------
router.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  //check if email already exists
  pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email],
    (error, results) => {
      if (results.rows.length) {
        res.send("User already exist!");
      }
      //query to post user
      pool.query(
        "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
        [name, email, password],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("User created successfully!");
        }
      );
    }
  );
});

router.get("/user", (req, res) => {
  const { name, password } = req.body;
  pool.query(
    "SELECT * FROM users WHERE name = $1 AND password = $2",
    [name, password],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Hello ${name}`).json(results.rows);
    }
  );
});

//-------------------ACTIVITIES------------------
router.get("/", (req, res) => {
  pool.query("SELECT * FROM activities", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

router.post("/new", (req, res) => {
  const { title, description, photo, date_created, user_id } = req.body;
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
        "INSERT INTO activities (title, description, photo, date_created, user_id) VALUES ($1, $2, $3, $4, $5)",
        [title, description, photo, date_created, user_id],
        (error, results) => {
          if (error) throw error;
          res.status(201).send("Activity created successfully!");
        }
      );
    }
  );
});

router.get("/:id", (req, res) => {
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

router.put("/:id", (req, res) => {
  //check if id exist
  //update ativity
});

router.delete("/:id", (req, res) => {
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
