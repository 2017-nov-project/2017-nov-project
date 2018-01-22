const router = require('express').Router();
const {getAllHouses} = require('../controllers')

router.route('/:county')
      .get(getAllHouses)


module.exports = router;