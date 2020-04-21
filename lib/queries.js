const mySQL = require("mysql");
const connection = require("./login_SQL");
const table = require("console.table");

class Queries {
    constructor(query, value) {
        this.query = query;
        this.value = value;
    }


    basicTableQuery(next) {
        connection.query(this.query, this.value, function (err, res) {
            if (err) throw err
            console.table(res);
            next();
        });
    };

    getDistinctQueries(nextQ, paramToNext) {
        connection.query(this.query, this.value, function (err, res) {
            if (err) throw err
            let arrTitle = [];
            arrTitle.forEach(function (title) {
                if (!arrTitle.includes(res[i].title)) {
                    arrTitle.push(title);
                };
            });
            nextQ(arrTitle, paramToNext);
        })
    }
    delete(nextQ, message) {
        connection.query(this.query, this.value, function (err, res) {
            if (err) throw err
            console.log("Deleted!");
            nextQ();
        })
    }

    update(nextQ, message) {
        connection.query(this.query, this.values, function (err, res) {
            if (err) throw err
            console.log(message);

            nextQ();
        })
    };

    queryResult(nextQ) {
        connection.query(this.query, this.values, function (err, res) {
            if (err) throw err
            nextQ(res);
        })
    }
}

module.exports = Queries