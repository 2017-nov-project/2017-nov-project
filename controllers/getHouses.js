const mongoose = require('mongoose');
const { House } = require('../models/');

const getAllHouses = (req, res, next) => {
    let search = req.params;
    const { street } = req.query;
    const { property_type } = req.query;
    const { new_build } = req.query;

    if (Object.keys(search).length) search = { ...search, street, property_type, new_build }
    else search = { ...search, property_type, new_build }
    House.find(search)
        .then(houses => res.send({ houses }))
}

module.exports = { getAllHouses };