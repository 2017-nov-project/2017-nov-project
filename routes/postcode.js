const router = require('express').Router();
const { averageHousePrice, getAllHouses, getPostcodeCoordinates } = require('../controllers');

router.route('/:postcode/average_price')
      .get(averageHousePrice);

router.route('/:postcode/houses')
      .get(getAllHouses);

router.route('/:postcode/coordinates')
      .get(getPostcodeCoordinates);

module.exports = router;