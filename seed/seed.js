const mongoose = require('mongoose');
mongoose.Promise = Promise;
const _ = require('underscore');
const { House, Postcode, Town } = require('../models');
const { housesData, postcodeData, townsData } = require('./data');

const seedDB = dbUrl => {
    const houses = housesData.map(house => _.omit(house, '_id'));
    
    return mongoose.connect(dbUrl)
        .then(() => mongoose.connection.db.dropDatabase())
        .then(() => House.collection.insertMany(houses))
        .then(() => Postcode.collection.insertMany(postcodeData))
        .then(() => Town.collection.insertMany(townsData))
        .then(console.log('Records added, closing connection.'))
        .then(() => mongoose.disconnect())
        .catch(console.log)
};

module.exports = { seedDB }