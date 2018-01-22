const {app} = require('./app');
const PORT = 3000

const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/housing');
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}...`)
});