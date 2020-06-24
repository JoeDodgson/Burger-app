// Node modules
var express = require("express");

// Declare the Express app and port (use process.env port definition, ready for deployment to Heroku)
var app = express();
var PORT = process.env.PORT || 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the static directory
app.use(express.static("public"));

// Link the server to the controller file for routing and handling requests
const routes = require("./controllers/burgers_controller.js");
app.use(routes);
// require("./controllers/burgers_controller.js")(app);

// Start the server and begin listening
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});