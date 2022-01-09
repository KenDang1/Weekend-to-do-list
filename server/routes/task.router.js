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

// GET endpoint
tasksRouter.get('/', (req, res) => {
    console.log('in GET /tasks router');
    let queryText = `Select * FROM "tasks" ORDER by "id"`
    pool.query(queryText).then((result) => {
        res.send(result.rows)
    })
    .catch((err) => {
        console.log('ERRPR in GET /tasks router', err);
        res.sendStatus(500);
    });
}); // end of GET endpoint




// export everything to server side
module.exports = tasksRouter;