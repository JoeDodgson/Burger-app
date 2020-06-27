// Require in node modules
const mysql = require("mysql");

// Require in files
const dotenv = require("dotenv");
dotenv.config();

// Create connection to the SQL server
let connection;

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "",
        database: "burgers_db"
    });
}

// Export the connection
module.exports = connection;