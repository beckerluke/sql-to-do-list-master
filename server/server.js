const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 5000;

// Import routes
const taskRouter = require('./routes/task.router');

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/tasks', taskRouter);

app.listen(PORT, () => {
    console.log('Listening on port: ', PORT);
});