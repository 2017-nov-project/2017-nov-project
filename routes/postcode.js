const router = require('express').Router();
const { averageHousePrice, getAllHouses, getCoordinates } = require('../controllers');

router.route('/:postcode/average_price')
      .get(averageHousePrice);

router.route('/:postcode/houses')
      .get(getAllHouses);

router.route('/:postcode/coordinates')
      .get(getCoordinates);

module.exports = router;