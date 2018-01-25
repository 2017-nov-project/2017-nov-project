const mongoose = require('mongoose');
mongoose.Promise = Promise;

const {House} = require('../models');
const {Postcode} = require('../models');

const {housesData} = require('./data');
const {postcodeData} = require('./data');

const seedDB = dbUrl => {

    const houses = housesData.map(house => {
        const houseWithoutId = {...house}
        Reflect.deleteProperty(houseWithoutId, '_id')
        return houseWithoutId
    });

    return mongoose.connect(dbUrl)
           .then(() => mongoose.connection.db.dropDatabase())
           .then(() => House.collection.insertMany(houses))
           .then(() => Postcode.collection.insertMany(postcodeData))
           .then(() => House.count())
           .then(count => console.log(`${count} records added, closing connection.`))
           .then(() => mongoose.disconnect())
           .catch(console.log)
};

module.exports = {seedDB}