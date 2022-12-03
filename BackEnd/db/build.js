const Pool = require("pg").Pool;
const fs = require("fs");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "streets_of_canada",
  password: "1234",
  port: 5432,
});

const sql = fs.readFileSync("./BackEnd/db/schema.sql").toString();

pool.query(sql, (error, results) => {
  if (error) throw error;
  console.log("schema built!");
});

//npm run builddb
