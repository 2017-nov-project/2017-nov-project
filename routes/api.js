const router = require('express').Router();

const housesRouter = require('./houses');
const priceRouter = require('./price');
const postcodeRouter = require('./postcode');
const streetRouter = require('./street');
const localityRouter = require('./locality');
const townRouter = require('./town');
const districtRouter = require('./district');
const countyRouter = require('./county');

router.use('/houses', housesRouter);
router.use('/average_price', priceRouter);
router.use('/postcode', postcodeRouter);
router.use('/street', streetRouter);
router.use('/locality', localityRouter);
router.use('/town', townRouter);
router.use('/district', districtRouter);
router.use('/county', countyRouter);

module.exports = router;