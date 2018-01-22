const mongoose = require('mongoose');
mongoose.Promise = Promise;

const {House} = require('../models');
const {housesData} = require('./data');



const seedDB = dbUrl => {

    return mongoose.connect(dbUrl)
           .then(() => {
            mongoose.connection.db.dropDatabase();
           })
           .then(() => {

            House.collection.insert(housesData) 
                   
        
           }).catch(console.log)
};

module.exports = {seedDB}