// Import node modules
const util = require("util");

// Import MySQL connection
const connection = require("./connection.js");

// Promisify methods
const queryAsync = util.promisify(connection.query).bind(connection);

// Returns a string of a given number of question marks separated by commas ("?,?,?") for use in SQL syntax
const questionMarksString = num => {
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
const objToSqlString = obj => {
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
  // Performs a query of all results of the specified table
  all: async (table, cb) => {

    // Generate the query string
    const queryString = `SELECT * FROM ${table};`;

    try {
      // Perform the database query using the query string
      const result = await queryAsync(queryString);
      
      // Feed result into callback function
      cb(result);
    }

    catch (error) {
      console.log("ERROR - orm.js - all(): " + error);
    }
  },
    
  // Creates a new record in the specified table
  create: async (table, cols, vals, cb) => {
      
    // Use questionMarksString function to generate a string of question marks of the required length
    const queryQuestionMarks = questionMarksString(vals.length);
    
    // Generate the query string
    const queryString = `INSERT INTO ${table} (${cols.toString()}) 
    VALUES (${queryQuestionMarks})`;
    
    try {
      // Perform the database query using the query string
      const result = await queryAsync(queryString, vals)
        
      // Feed result into callback function
      cb(result);
    }

    catch (error) {
      console.log("ERROR - orm.js - create(): " + error);
    }
  },
  
  // Updates an existing record in the specified table
  // objColVals is an object with key value pairs representing column value pairs
  // E.g. {burger_name: "Cheese burger", devoured: true}
  update: (table, objColVals, condition, cb) => {
      
    // Use objToSqlString function to generate a string representing the objColVals object
    const objColValsString = objToSqlString(objColVals);
    
    // Generate the query string
    const queryString = `UPDATE ${table} 
    SET ${objColValsString} 
    WHERE ${condition};`;
    
    // Perform the database query using the query string
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
