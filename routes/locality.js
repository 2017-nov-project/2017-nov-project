const router = require('express').Router();
const { averageHousePrice, getAllHouses } = require('../controllers');

router.route('/:locality/average_price')
      .get(averageHousePrice);

router.route('/:locality/houses')
      .get(getAllHouses);

module.exports = router;