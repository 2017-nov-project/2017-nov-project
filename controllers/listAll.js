const mongoose = require('mongoose');
const { Town, Locality } = require('../models/');

const listAll = (req, res, next) => {

let [[key, value]] = Object.entries(req.params)

if (key === 'town') key = 'city';

const collection = {
  city: Town,
  locality: Locality
}

  collection[key].find({[key]: new RegExp('^' + value)}).lean()
    .then(results => results.map(result => result[key]).slice(0,10))
    .then(result => res.send({ result }));
}

module.exports = { listAll };