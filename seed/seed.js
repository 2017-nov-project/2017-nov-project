const mongoose = require('mongoose');
mongoose.Promise = Promise;
const _ = require('underscore');
const { House, Postcode, Town, Locality, County } = require('../models');
const { housesData, postcodeData, townsData, localityData, countyData } = require('./data');

console.log (Array.isArray(localityData)) 
console.log (Array.isArray(countyData)) 

const seedDB = dbUrl => {

    const houses = housesData.map(house => _.omit(house, '_id'));

    const localities = localityData.map(locality => ({'locality':locality}))
    //  const counties = countyData.map(county => ({'county':county}))
    return mongoose.connect(dbUrl)
        .then(() => mongoose.connection.db.dropDatabase())
        .then(() => House.collection.insertMany(houses))
        .then(() => Postcode.collection.insertMany(postcodeData))
        .then(() => Town.collection.insertMany(townsData))
        .then(() => Locality.collection.insertMany(localities))
        //  .then(() => County.collection.insertMany(counties))
        .then(console.log('Records added, closing connection.'))
        .then(() => mongoose.disconnect())
        .catch(console.log)
};

module.exports = { seedDB }