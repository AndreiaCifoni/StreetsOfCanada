const { Router } = require("express");
const router = Router();
const pool = require("../db/index");

//-------------------ACTIVITIES------------------
router.get("/", (req, res) => {
  pool.query("SELECT * FROM activities", (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
});

router.post("/", (req, res) => {
  //check if title already exist
  //query to post activity
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
