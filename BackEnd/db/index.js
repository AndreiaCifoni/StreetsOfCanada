const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "streets_of_canada",
  password: "1234",
  port: 5432,
});

module.exports = pool;
