const router = require('express').Router();
const { getCoordinates } = require('../controllers');

router.route('/')
  .get(getCoordinates);

module.exports = router;