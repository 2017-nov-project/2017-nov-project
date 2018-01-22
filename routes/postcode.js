const router = require('express').Router();
const {averageHousePrice} = require('../controllers')


router.route('/:postcode/prices')
      .get(averageHousePrice)


module.exports = router;