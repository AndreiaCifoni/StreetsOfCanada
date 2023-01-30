const Pool = require("pg").Pool;
const pool = new Pool({
  user: process.env.USERNAME || "postgres",
  host: process.env.HOSTNAME || "localhost",
  database: process.env.DATABASE || "streets_of_canada",
  password: process.env.PASSWORD || "1234",
  port: process.env.DBPORT || 5432,
});

module.exports = pool;
