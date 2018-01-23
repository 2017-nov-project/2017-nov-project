const router = require('express').Router();
const { averageHousePrice, getAllHouses } = require('../controllers');

router.route('/:street/average_price')
      .get(averageHousePrice);

router.route('/:street/houses')
      .get(getAllHouses);

module.exports = router;