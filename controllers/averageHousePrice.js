const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    const search = Object.keys(req.params)[0];
    const street = Object.keys(req.query)[0];
    House.aggregate([
        { $match: { $and: [req.params, req.query] } },
        {
            $group:
                {
                    _id: `$${search}`,
                    average: { $avg: '$price_paid' }
                }
        }
    ])
        .then(houses => res.send(houses))
}

module.exports = { averageHousePrice };