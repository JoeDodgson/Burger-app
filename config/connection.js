// Require in node modules
const mysql = require("mysql");
const dotenv = require("dotenv");

// Set up config
dotenv.config();

// Create connection to the SQL server
let connection;

// Use JAWSDB_URL as connection URL if available, else use local connection
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