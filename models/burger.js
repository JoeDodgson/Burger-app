// Require app files
const orm = require("../config/orm.js");

// The burger object has methods that call the ORM functions, specifying the burger table
const burger = {
    all: cb => {
        orm.all("burgers", res => {
            cb(res);
        });
    },
    create: (cols, vals, cb) => {
        orm.create("burgers", cols, vals, res => {
            cb(res);
        });
    },
    devour: (objColVals, condition, cb) => {
        orm.update("burgers", objColVals, condition, res => {
            cb(res);
        });
    }
};

// Export at the end of the `burger.js` file.
module.exports = burger;