const router = require('express').Router();
const postcodeRouter = require('./postcode');
const housesRouter = require('./houses');
const countyRouter = require('./county');
//const {countyRouter} = require('./');
    

router.use('/postcode', postcodeRouter);
router.use('/houses', housesRouter);
router.use('/county', countyRouter);

module.exports = router;