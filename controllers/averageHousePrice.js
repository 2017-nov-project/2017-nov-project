const _ = require('underscore');
const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    let param = req.params;
    let query = req.query;
    const searchType = Object.keys(param)[0];

    if (!searchType) query = _.omit(query, 'street');

    House.aggregate([
        { $match: { $and: [param, query] } },
        {
            $group:
                {
                    _id: `$${searchType}`,
                    average: { $avg: '$price_paid' }
                }
        }
    ])
        .then(price => res.send(price))
}

module.exports = { averageHousePrice };