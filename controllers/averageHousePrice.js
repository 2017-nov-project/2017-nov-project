const mongoose = require('mongoose');
const {House} = require('../models/');

const averageHousePrice = (req, res, next) => {
    const search = Object.keys(req.params)[0];    
    House.aggregate([
        {$match: req.params},
        {$group:
            {
                _id: `$${search}`,
                average: {$avg: '$price_paid'}
            }
        }
    ])
    .then(houses => res.send(houses))
}

module.exports = {averageHousePrice};