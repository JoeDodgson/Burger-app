// Require in modules
const express = require("express");

// Create the router variable
const router = express.Router();

// Import the model (burger.js)
const burger = require("../models/burger.js");

// Create routes (only 1 route for this application)
router.get("/", (req, res) => {

    // Call the 'all' method from the model
    burger.all(data => {

        // Create a handlebars object using the data returned
        const hbsObj = { burgers: data };

        // Use the handlebars object to render the page
        res.render("index", hbsObj);
    });
});

// Post

// Put

// Export routes for server.js to use.
module.exports = router;
