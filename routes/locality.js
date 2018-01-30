const router = require('express').Router();
const { averageHousePrice, getAllHouses, listAll } = require('../controllers');

router.route('/:locality/average_price')
      .get(averageHousePrice);

router.route('/:locality/houses')
      .get(getAllHouses);

router.route('/:locality')
      .get(listAll);

module.exports = router;