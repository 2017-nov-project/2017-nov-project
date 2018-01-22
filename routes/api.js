const router = require('express').Router();
const postcodeRouter = require('./postcode');


router.use('/postcodes', postcodeRouter);


module.exports = router;