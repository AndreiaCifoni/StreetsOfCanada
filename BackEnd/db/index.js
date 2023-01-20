const pool = require("./pool");

const createUser = async (username, email, password) => {
  const { rows } = await pool.query(
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
    [username, email, password]
  );
  return rows?.length >= 1 ? rows[0] : null;
};

module.exports = {
  createUser,
};
