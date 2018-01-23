const router = require('express').Router();
const { averageHousePrice, getAllHouses } = require('../controllers');

router.route('/:district/average_price')
      .get(averageHousePrice);

router.route('/:district/houses')
      .get(getAllHouses);

module.exports = router;