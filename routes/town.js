const router = require('express').Router();
const { averageHousePrice, getAllHouses } = require('../controllers');

router.route('/:town/average_price')
      .get(averageHousePrice);

router.route('/:town/houses')
      .get(getAllHouses);

module.exports = router;