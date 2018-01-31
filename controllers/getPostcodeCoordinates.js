const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { Postcode } = require('../models/');
const { House } = require('../models/');


const getPostcodeCoordinates = async (req, res, next) => {
  const { postcode } = req.params;
  const ukAverage = await fetch(`https://peaceful-waters-20110.herokuapp.com/api/average_price`)
    .then(buffer => buffer.json())

  if (postcode) {
    Postcode.findOne({ 'postcode': postcode }, { postcode: 1, latitude: 1, longitude: 1, _id: 0 })
      .then(coordinates => res.send(coordinates));
  }
  else {
    Postcode.aggregate(
      [
        {
          $lookup:
            {
              from: 'houses',
              localField: 'postcode',
              foreignField: 'postcode',
              as: 'houses'
            }
        },
        {
          $project: {
            'postcode': 1,
            'latitude': 1,
            'longitude': 1,
            '_id': 0,
            'houses.pricepaid': 1
          }
        }
      ]).limit(1)
      .then((postcodes) => postcodes.map(({ postcode, houses, latitude, longitude }) => {
        const average = houses.reduce((sum, house) => sum += house.pricepaid, 0) / houses.length;
        const weight = average / ukAverage.average;

        return { postcode, latitude, longitude, weight }
      }))
      .then(arr => res.send({ arr }))
      .catch(console.log)
  }
}

module.exports = { getPostcodeCoordinates };