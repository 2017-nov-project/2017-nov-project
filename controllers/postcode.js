const mongoose = require('mongoose');
const {House} = require('../models/');

const averageHousePrice = (req, res, next) => {

    const {postcode} = req.params
    
    House.aggregate([
        {$match: { postcode }
        },
        {$group:
            {
                _id: '$postcode',
                average: {$avg: '$price_paid'}
            }
        }
    ])
    .then(houses => res.send(houses))
}

module.exports = {averageHousePrice};