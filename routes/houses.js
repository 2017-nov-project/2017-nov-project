const router = require('express').Router();
const {getAllHouses} = require('../controllers')


router.route('/')
      .get(getAllHouses)


module.exports = router;