const app = require('./app');
require('dotenv').config({path: `./.env.${process.env.NODE_ENV}`})

const {PORT, DB_URL} = process.env
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(DB_URL);
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
});

module.exports = app;