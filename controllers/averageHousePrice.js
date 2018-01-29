const _ = require('underscore');
const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    let {params, query} = req;
    const searchType = Object.keys(params)[0];

    if (!searchType) query = _.omit(query, 'street');

    House.aggregate([
        { $match: { $and: [params, query] } },
        {
            $group:
                {
                    _id: `$${searchType}`,
                    average: { $avg: '$price_paid' }
                }
        }
    ])
        .then(([{_id, average}]) => res.send({_id, average: average.toLocaleString(undefined, {maximumFractionDigits: 0})}))
        
}

module.exports = { averageHousePrice };