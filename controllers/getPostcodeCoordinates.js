const mongoose = require('mongoose');
const { Postcode } = require('../models/');

const getPostcodeCoordinates = (req, res, next) => {
  const {postcode} = req.params;

  if (postcode) {
    Postcode.findOne({ 'postcode': postcode })
      .then(postcodeData => {
        const { longitude, latitude } = postcodeData;
        res.send({ coordinates: { longitude, latitude } });
      });
  }
  else {
    Postcode.find().lean()
      .then(postcodesData => {
        return postcodesData.map(postcodeData => {
          const { longitude, latitude } = postcodeData;
          if (longitude === undefined ) return;
          else return { longitude, latitude };
        })
      })
      .then(coordinatesArr => res.send({ coordinatesArr }));
  }
}

module.exports = { getPostcodeCoordinates };