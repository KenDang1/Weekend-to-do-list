const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// connect to task.router.js
const tasksRouter = require('./routes/task.router');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('server/public'));

// middle connection between client and router
app.use('/tasks', tasksRouter);

// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
  });