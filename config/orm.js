// Import MySQL connection.
const connection = require("connection.js");

// Returns a string of a given number of question marks separated by commas ("?,?,?") for use in SQL syntax
const questionMarksString = (num) => {
  let str = "";

  if (num > 0) {
    str += "?";
  }

  for (let i = 1; i < num; i++) {
    str += ",?";
  }

  return str;
};

// Converts object key value pairs into string for use in SQL syntax
const objToSqlString = (obj) => {
  const arr = [];

  // Loop through each key in obj and push the key value pair as a string int arr
  for (let key in obj) {
    let value = obj[key];

    // Check .hasOwnProperty of Object to skip hidden properties
    if (Object.hasOwnProperty.call(obj, key)) {
      // If the value is a string with spaces, add quotations round it
      if (typeof value === "string" && value.indexOf(" ") !== -1) {
        value = `'${value}'`;
      }
      // Push into arr in the form "key=value"
      arr.push(`${key}=${value}`);
    }
  }

  // Return a single comma-separated string of SQL key-value pairs
  return arr.toString();
};

// ORM object containing all SQL query functions
const orm = {
  all: (table, cb) => {
    // Perform a query of all results of the provided table name
    const queryString = `SELECT * FROM ${table};`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      // Feed result into callback function
      cb(result);
    });
  }
};

// Export the ORM object for use in burger.js (the model)
module.exports = orm;
