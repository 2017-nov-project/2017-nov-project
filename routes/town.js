const router = require('express').Router();
const { averageHousePrice, getAllHouses, getTownCoordinates } = require('../controllers');

router.route('/:town/average_price')
      .get(averageHousePrice);

router.route('/:town/houses')
      .get(getAllHouses);

router.route('/:town/coordinates')
      .get(getTownCoordinates);

module.exports = router;