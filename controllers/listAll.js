const mongoose = require('mongoose');
const { Town, Locality } = require('../models/');

const listAll = (req, res, next) => {

let [[key, value]] = Object.entries(req.params)

console.log(key, value);



if (key === 'town') key = 'city';

console.log({key})

const collection = {
  city: Town,
  locality: Locality
}

console.log(Object.keys(collection))

console.log('collection accessed', collection[key]);

  collection[key].find({[key]: new RegExp('^' + value)}).lean()
    .then(results => results.map(result => result[key]).slice(0,10))
    .then(result => res.send({ result }));
}

module.exports = { listAll };