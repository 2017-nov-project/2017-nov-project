const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    const search = Object.keys(req.params)[0];

    const { street } = req.query;
    const { property_type } = req.query;
    const { new_build } = req.query;
    let query;

    if (!search) query = { property_type, new_build };
    else query = { street, property_type, new_build };

    House.aggregate([
        { $match: { $and: [req.params, query] } },
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