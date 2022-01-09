const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');


// POST endpoint
tasksRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log('in POST add new koala', newTask);

    let queryText = `
        INSERT INTO "tasks"
            ("task-to-do", "description")
        VALUES ($1, $2);
    `;

    let queryParams = [
        newTask.task,
        newTask.description,
    ];

    pool.query(queryText, queryParams)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('ERROR POST new task 👎', err);
            
            res.sendStatus(500);
        });
}); // end POST endpoint

// export everything to server side
module.exports = tasksRouter;