// Require express and burger.js
const express = require('express');
const burger = require('../models/burger.js');

// CREATE ROUTER
const router = express.Router();

router.get('/', (req, res) => {
    burger.all((data) => {
        const hbsObject = {
            burgers: data,
        };
        console.log(hbsObject);
        res.render('index', hbsObject);
    });
});

router.post('/', (req, res) => {
    burger.create(['burger_name', 'devoured'], [req.body.burger_name, req.body.devoured], (result) =>{
        // res.json({ id: result.insertId });
        res.render('index', hbsObject);
    });
});

router.put('/:id', (req, res) => {
    const condition = `id = ${req.params.id}`;
    console.log('condition', condition);
    burger.update(
        {
            devoured: req.body.devoured,
        },
        condition,
        (result) => {
            if (result.changedRows === 0) {
                return res.status(404).end();
            }
            res.status(200).end();
        }
    );
});

// Export router
module.exports = router;