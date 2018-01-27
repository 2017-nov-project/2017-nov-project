const router = require('express').Router();
const { getPostcodeCoordinates } = require('../controllers');

router.route('/postcodes')
  .get(getPostcodeCoordinates);

module.exports = router;