const express = require('express');
const tasksRouter = express.Router();
const pool = require('../modules/pool');


// export everything to server side
module.exports = tasksRouter;