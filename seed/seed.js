const mongoose = require('mongoose');
mongoose.Promise = Promise;
const _ = require('underscore');
const { House } = require('../models');
const { Postcode } = require('../models');
const { Town } = require('../models');
const { housesData } = require('./data');
const { postcodeData } = require('./data');
const { townsData } = require('./data');


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