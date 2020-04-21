const util = require("util");
const mysql = require("mysql");


const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    port: 3306,
    password: process.env.SQL_PASSWORD,
    database: "employeeTracker_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});
connection.query = util.promisify(connection.query);
module.exports = connection;
