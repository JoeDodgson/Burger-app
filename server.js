// Node modules
var express = require("express");

// Declare the Express app and port (use process.env port definition, ready for deployment to Heroku)
var app = express();
var PORT = process.env.PORT || 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Start the server and begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});