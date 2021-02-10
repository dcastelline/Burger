// Require ORM
const { selectAll } = require('../config/orm.js');
const orm = require('../config/orm.js');

// CREATE CODE THAT WILL CALL ORM FUNCTIONS USING BURGER SPECIFIC INPUT FOR THE ORM
const burger = {
    all(cb) {
      orm.selectAll('burgers', (res) => cb(res));
    },
    // The variables cols and vals are arrays.
    create(cols, vals, cb) {
      orm.insertOne('burgers', cols, vals, (res) => cb(res));
    },
    update(objColVals, condition, cb) {
      orm.updateOne('burgers', objColVals, condition, (res) => cb(res));
    },
  };

// Export burger.js
module.exports = burger;