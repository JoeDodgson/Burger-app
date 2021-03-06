// Require app files
const orm = require("../config/orm.js");

// The burger object has methods that call the ORM functions, specifying the burger table
const burger = {
    all: () => orm.all("burgers"),
    create: (cols, vals) => orm.create("burgers", cols, vals),
    update: (objColVals, condition) => orm.update("burgers", objColVals, condition)
};

// Export at the end of the `burger.js` file.
module.exports = burger;