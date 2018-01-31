const omit = require('object.omit');

const mongoose = require('mongoose');
const { House } = require('../models/');

const averageHousePrice = (req, res, next) => {
    let { params, query } = req;
    let searchType
    let location

    if (Object.keys(params).length !== 0) {
        const [[searchType, location]] = Object.entries(params)
        params = { [searchType]: location.toUpperCase() }
    }

    if (!searchType) query = omit(query, 'street');

    House.aggregate([
        { $match: { $and: [params, query] } },
        {
            $group:
                {
                    _id: 0,
                    average: { $avg: '$pricepaid' }
                }
        }
    ])
        .then(([average]) => res.send(omit(average, '_id')))
}

module.exports = { averageHousePrice };