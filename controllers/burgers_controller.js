// Require in modules
const express = require("express");

// Create the router variable
const router = express.Router();

// Import the model (burger.js)
const burger = require("../models/burger.js");

// Handle routes (only 1 route for this application)
router.get("/", (req, res) => {

    // Call the 'all' method from the model
    burger.all(data => {
        
        // Create a handlebars object using the data returned
        const hbsObj = { burgers: data };
        
        // Use the handlebars object to render the page
        res.render("index", hbsObj);
    });
});

// Handles post request for creation of a new burger
router.post("/api/burgers", (req, res) => {
    
    // Call the 'all' method from the model. Pass in name and set 'devoured' to false
    burger.create(["burger_name", "devoured"], [req.body.name, false], result => {
        
        // If no rows were affected, return a 404 status
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    });
});

// Handles post request for changing the devoured property of a specified burger to 'true'
router.put("/api/burgers/:id", (req, res) => {
    
    const condition = `id = ${req.params.id}`;
    
    burger.update({ devoured: true }, condition, result => {

        // If no rows were changed, return a 404 status
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    }
  );
});

// Export routes for server.js to use.
module.exports = router;