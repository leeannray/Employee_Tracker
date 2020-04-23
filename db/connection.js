const util = require("util");
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  // Username
  user: "root",
  // Password
  port: 3306,
  password: "psswrd!",
  database: "employeeTracker_db",
});

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Sets up connection.query to use promises rather than callbacks --> use the async/await syntax
connection.query = util.promisify(connection.query);
//export to be used for sql
module.exports = connection;
