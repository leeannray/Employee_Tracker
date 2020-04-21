const connection = require("../db/connection");

class Database{

    constructor(connection) {
        this.connection = connection;
    }



    viewAllEmployees() {
        return this.connection.query("SELECT * FROM employee ")
    }

}