const omit = require('object.omit');

const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    let { params, query } = req;
    const searchType = Object.keys(params)[0];

    if (!searchType) query = omit(query, 'street');

    House.find({ ...params, ...query })
        .then(houses => {
            const sum = houses.reduce((avr, house) => avr + house.pricepaid, 0);
            const average = houses.length ? sum / houses.length : 0;
            res.send({ _id: params[searchType], average: average.toFixed() })
        });
}

module.exports = { averageHousePrice };