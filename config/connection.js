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
        host: process.env.DB_LOCAL_HOST,
        port: 3306,
        user: process.env.DB_LOCAL_USER,
        password: process.env.DB_LOCAL_PASS,
        database: "burgers_db"
    });
}

// Export the connection
module.exports = connection;