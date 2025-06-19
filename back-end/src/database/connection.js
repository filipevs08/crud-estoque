const mysql = require("mysql2/promise");

require("dotenv").config();

const connection = mysql.createPool(
  {
    host: process.env.HOST,
    password: process.env.MYSQL_PASSWORD,
    user: process.env.MYSQL_USER,
    database: process.env.DB,
  },
  (err) => {
    if (err) {
      console.log(err);
    }
  }
);

module.exports = connection;
