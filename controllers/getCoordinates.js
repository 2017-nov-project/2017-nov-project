const mongoose = require('mongoose');
const { Postcode } = require('../models/');

const getCoordinates = (req, res, next) => {
  const param = req.params;
  const search = { 'result.postcode': param.postcode };

  Postcode.findOne(search)
    .then(postcodeData => {
      const {longitude} = postcodeData.result;
      const {latitude} = postcodeData.result;
      res.send({coordinates: { longitude, latitude }})
    });
}

module.exports = { getCoordinates };