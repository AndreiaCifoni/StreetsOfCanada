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

module.exports = {
  createUser,
  getUserByUsername,
  createSession,
  deleteSession,
  getUserBySession,
  createReview,
};
