const mongoose = require('mongoose');
const {House} = require('../models/');

const getAllHouses = (req, res, next) => {
    let search = req.params;
    if (Object.keys(search).length) search = {...search, ...req.query}
    House.find(search)
         .then(houses => res.send({ houses }))
}

module.exports = {getAllHouses};