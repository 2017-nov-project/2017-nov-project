const _ = require('underscore');
const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    let { params, query } = req;
    const searchType = Object.keys(params)[0];

    if (!searchType) query = _.omit(query, 'street');

    console.log(query, params)

    House.find({ ...params, ...query })
        .then(houses => {
            const average = houses.reduce((avr, house) => avr + house.price_paid, 0);
            res.send({ _id: params[searchType], average: average.toFixed() })
        });

}

module.exports = { averageHousePrice };