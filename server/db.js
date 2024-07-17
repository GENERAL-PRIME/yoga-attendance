const { Pool } = require("pg");
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "yoga-attendance",
  password: "na_45",
  port: 5432,
});

module.exports = pool;
