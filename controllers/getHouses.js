const omit = require('object.omit');

const mongoose = require('mongoose');
const { House } = require('../models/');

const getAllHouses = (req, res, next) => {
    const param = req.params;
    const query = req.query;
    let search = {};

    if (Object.keys(param).length) search = { ...param, ...query }
    else {
        newQuery = omit(query, 'street')
        search = { ...param, ...newQuery }
    }

    House.find(search)
        .then(houses => res.send({ houses }))
}

module.exports = { getAllHouses };