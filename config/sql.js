var mysql = require("mysql");
require("dotenv").config();

var con = mysql.createConnection({
  host: process.env.host,
  user: process.env.user || "root",
  password: process.env.password || "",
  database: process.env.database,
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected -> " + process.env.database);
});

module.exports = con;
