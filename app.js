const app = require('express')();
const bodyparser = require('body-parser');
const {apiRouter} = require('./routes')

app.use(bodyparser.json());

app.use('/api', apiRouter);

app.use('/*', (req,res) => {
    res.status(404).send('404 - page not found');
});

module.exports = app