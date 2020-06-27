// Node modules
const express = require("express");
const exphbs = require("express-handlebars");

// Declare the Express app and port (use process.env port definition, ready for deployment to Heroku)
const app = express();
const PORT = process.env.PORT || 8080;

// Set up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve the static directory
app.use(express.static("public"));

// Link the server to the controller file for routing and handling requests
const routes = require("./controllers/burgers_controller.js");
app.use(routes);

// Set Handlebars as the template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Start the server and begin listening
app.listen(PORT, () => {
  console.log("App listening on PORT " + PORT);
});