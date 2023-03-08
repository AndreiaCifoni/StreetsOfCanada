const Pool = require("pg").Pool;
const connectionString = process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
// const pool = new Pool({
//   user: process.env.DBUSERNAME || "postgres",
//   host: process.env.DBHOSTNAME || "localhost",
//   database: process.env.DBDATABASE || "streets_of_canada",
//   password: process.env.DBPASSWORD || "1234",
//   port: process.env.DBPORT || 5432,
// });

module.exports = pool;
