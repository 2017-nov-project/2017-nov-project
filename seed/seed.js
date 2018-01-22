const mongoose = require('mongoose');
mongoose.Promise = Promise;

const {House} = require('../models');
const {housesData} = require('./data');

console.log(Array.isArray(housesData));


const seedDB = dbUrl => {

    const houses = housesData.map(house => {
        const houseWithoutId = {...house}
        Reflect.deleteProperty(houseWithoutId, '_id')
        return houseWithoutId
    });
    

    return mongoose.connect(dbUrl)
           .then(() => mongoose.connection.db.dropDatabase())
           .then(() => House.collection.insertMany(houses))
           .catch(console.log)
};

module.exports = {seedDB}