const mongoose = require('mongoose');
const { Town } = require('../models/');

const getTownCoordinates = (req, res, next) => {
  const town = req.params.town.toLowerCase();

  Town.findOne({ city: town }).lean()
    .then(townData => {
      console.log(townData.longitude)
      const { longitude } = townData;
      const { latitude } = townData;
      res.send({ coordinates: { longitude, latitude } });
    });
}

module.exports = { getTownCoordinates };