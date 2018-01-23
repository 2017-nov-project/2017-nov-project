const mongoose = require('mongoose');
const {House} = require('../models/');

const getAllHouses = (req, res, next) => {

    const query = req.params;

    if(query.hasOwnProperty('county')) {
        
        query['county'] = query['county'].toUpperCase();
    }
    
    
    House.find(query)
         .then(houses => res.send({ houses }))
}

module.exports = {getAllHouses};