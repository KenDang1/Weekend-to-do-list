const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');


// POST endpoint
tasksRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log('in POST add new koala', newTask);

    let queryText = `
        INSERT INTO "tasks"
            ("task", "description")
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
        console.log('ERROR in GET /tasks router', err);
        res.sendStatus(500);
    });
}); // end of GET endpoint

// DELETE endpoint
tasksRouter.delete('/:id', (req, res) => {
    console.log('in DELETE /tasks :id', req.params.id);

    let queryText = `
        DELETE FROM "tasks"
        WHERE id = $1;
    `;

    let queryParams = [
        req.params.id
    ];

    pool.query(queryText, queryParams)
        .then(() => {
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('failed to delete 👻', err);
            res.sendStatus(500);
        })
}); // end of DELETE endpoint

// Start ofPUT /tasks/status endpoint
tasksRouter.put('/status/:id', (req, res) => {
    console.log('id is', req.params.id);
    let queryText = `
        UPDATE "tasks"
        SET "status" = $1
        WHERE "id" = $2;
    `;

    let queryParams = [
        req.body.status,
        req.params.id
    ];

    pool.query(queryText, queryParams)
        .then(() => {
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error in status change', err);
            res.sendStatus(500);  
        }) 
}); // end of PUT /tasks/status endpoint

// export everything to server side
module.exports = tasksRouter;