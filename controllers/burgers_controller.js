// Require in modules
const express = require("express");

// Create the router variable
const router = express.Router();

// Import the model (burger.js)
const burger = require("../models/burger.js");

// Handle routes (only 1 route for this application)
router.get("/", async (req, res) => {
    try {
        // Call the 'all' method from the model
        const data = await burger.all();
            
        // Create a handlebars object using the data returned
        const hbsObj = { burgers: data };
        
        // Use the handlebars object to render the page
        res.render("index", hbsObj);
    }
    catch (error) {
        console.log("ERROR - burgers_controller.js - API route '/': " + error);
    }
});

// Handles post request for creation of a new burger
router.post("/api/burgers", async (req, res) => {
    try {
        // Call the 'create' method from the model. Pass in name and set 'devoured' to false
        const result = await burger.create(["burger_name", "devoured"], [req.body.name, false]);
        
        // If no rows were affected, return a 404 status
        if (result.affectedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    }
    catch (error) {
        console.log("ERROR - burgers_controller.js - API route '/api/burgers': " + error);
    }
});

// Handles post request for changing the devoured property of a specified burger to 'true'
router.put("/api/burgers/:id", async (req, res) => {
    // Create a condition query string using the burger ID from the request params
    const condition = `id = ${req.params.id}`;
    
    try {
        // Call the 'update' method from the model. Pass in Col - Vals object condition and condition string
        const result = await burger.update({ devoured: true }, condition);
    
        // If no rows were changed, return a 404 status
        if (result.changedRows === 0) {
            return res.status(404).end();
        }
        res.status(200).end();
    }
    catch (error) {
        console.log("ERROR - burgers_controller.js - API route '/api/burgers/:id': " + error);
    }
});

// Export routes for server.js to use.
module.exports = router;