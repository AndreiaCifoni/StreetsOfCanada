const Pool = require("pg").Pool;
const fs = require("fs");
const pool = new Pool({
  user: process.env.USERNAME || "postgres",
  host: process.env.HOSTNAME || "localhost",
  database: process.env.DATABASE || "streets_of_canada",
  password: process.env.PASSWORD || "1234",
  port: process.env.PORT || 5432,
});

const sql = fs.readFileSync("./db/schema.sql").toString();

pool.query(sql, (error, results) => {
  if (error) throw error;
  console.log("schema built!");
});

//npm run builddb
