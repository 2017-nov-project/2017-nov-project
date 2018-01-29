const mongoose = require('mongoose');
const { Town } = require('../models/');

const listAll = (req, res, next) => {

const {town} = req.params

  Town.find({city: new RegExp('^' + town)}).lean()
    .then(townData => townData.map(town => town.city))
    .then(town => res.send({ town }));
}

module.exports = { listAll };