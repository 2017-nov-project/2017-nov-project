const router = require('express').Router();
const { averageHousePrice } = require('../controllers');

router.route('/')
      .get(averageHousePrice);

module.exports = router;