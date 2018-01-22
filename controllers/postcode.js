const mongoose = require('mongoose');
const {House} = require('../models/');


const averageHousePrice = (req, res, next) => {

    const {postcode} = req.params

    
    House.aggregate([
        { 
            $match: {
                postcode
            }
        }
    ])
      
         .then(houses => res.send(houses))
     

}

module.exports = {averageHousePrice};