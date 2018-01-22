const router = require('express').Router();
const {averageHousePrice, getAllHouses} = require('../controllers')


router.route('/:postcode/prices')
      .get(averageHousePrice)

router.route('/:postcode/houses')
      .get(getAllHouses)


module.exports = router;