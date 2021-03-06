const router = require('express').Router();
const { averageHousePrice, getAllHouses } = require('../controllers');

router.route('/:county/average_price')
      .get(averageHousePrice);

router.route('/:county/houses')
      .get(getAllHouses);

module.exports = router;