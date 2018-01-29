const _ = require('underscore');
const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    let { params, query } = req;
    const searchType = Object.keys(params)[0];

    if (!searchType) query = _.omit(query, 'street');

    House.find({ ...params, ...query })
        .then(houses => {
            const sum = houses.reduce((avr, house) => avr + house.price_paid, 0);
            const average = sum / houses.length;
            res.send({ _id: params[searchType], average: average.toFixed() })
        });

}

module.exports = { averageHousePrice };