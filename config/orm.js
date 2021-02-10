// Require connection.js
const connection = require('./connection.js');

// Helper function for SQL
const printQuestionMarks = (num) => {
    const arr = [];
    for (let i = 0; i< num; i++) {
        arr.push('?');
    }
    return arr.toString();
};

// Helper to convert objects to SQL syntax
const objToSql = (ob) => {
    const arr = [];

    for (const key in ob) {
        if (Object.hasOwnProperty.call(ob, key)) {
            arr.push(key + '=' + ob[key]);
        }
    }
    return arr.toString();
};

// Methods
const orm = {
    all(tableInput, cb) {
        let queryString = `SELECT * FROM ${tableInput}`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    create(table, cols, vals, cb) {
        let queryString = `INSERT INTO ${table}`;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
    update(table, objColVals, condition, cb) {
        let queryString = `UPDATE ${table}`;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            }
            cb(result);
        });
    },
};

// Export ORM
module.exports = orm;