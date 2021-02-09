// Require connection.js
const connection = require('./connection.js');

// Helper function for adding ?s
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
        let value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeOf value === 'string' && value.indexOf(' ') >= 0) {
                value = `${value}`;
            }
        }
    }
    return arr.toString();
}

// Methods
const orm = {
    all(tableInput, cb) {
        const queryString = `SELECT * FROM ${tableInput}`;
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
    delete(table, condition, cb) {
        let queryString = `DELETE FROM ${table}`;
        queryString += 'WHERE ';
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