// Require in node modules
const mysql = require("mysql");

// Require in files
const dotenv = require("dotenv");
dotenv.config();

// Create connection to the SQL server
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "burgers_db"
});

// Export the connection
module.exports = connection;