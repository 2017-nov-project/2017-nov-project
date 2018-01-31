const app = require('express')();
const bodyparser = require('body-parser');
const apiRouter = require('./routes/api');
const cors = require('cors')


const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') require('dotenv').config({ path: `./.env.${process.env.NODE_ENV}` });
const { DB_URL } = process.env

mongoose.Promise = Promise;
mongoose.connect(DB_URL);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(cors());

app.use('/api', apiRouter);

app.use('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

app.use('/*', (req, res) => {
    res.status(404).send('404 - page not found');
});

module.exports = app