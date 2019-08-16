const express = require('express');
const taskRouter = express.Router();

//Connect to Database
const pool = require('../modules/pool');

// GET route
taskRouter.get('/', (req,res) => {
    const queryText = `SELECT * FROM "tasks";`;
    
    pool.query(queryText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((err) => {
            console.log('Error: ', err);
            res.sendStatus(500);
        });
});




//POST route
taskRouter.post('/', (req,res) => {
    let newTask = req.body;
    const queryText = `INSERT INTO "tasks" ("task", "completed")
    VALUES ($1, 'N');`

    pool.query(queryText, [newTask.task])
        .then((result) => {
        res.sendStatus(201); 
        })
        .catch((err) => {
            console.log('error in posting', err);
            
            res.sendStatus(500);
        });
});


module.exports = taskRouter;