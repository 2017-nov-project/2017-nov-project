const mongoose = require('mongoose');
const { Postcode } = require('../models/');

const getCoordinates = (req, res, next) => {
  const param = req.params;

  if (param.postcode) {
    const search = { 'result.postcode': param.postcode };
    Postcode.findOne(search)
      .then(postcodeData => {
        const { longitude, latitude } = postcodeData.result;
        res.send({ coordinates: { longitude, latitude } });
      });
  }
  else {
    Postcode.find()
      .then(postcodesData => {
        return postcodesData.map(postcodeData => {
          const { longitude, latitude } = postcodeData.result;
          if (longitude === undefined ) return;
          else return { longitude, latitude };
        })
      })
      .then(coordinatesArr => res.send({ coordinatesArr }));
  }
}

module.exports = { getCoordinates };