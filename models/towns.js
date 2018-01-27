const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const townSchema = new Schema({
    Country: String,
    City: String,
    AccentCity: String,
    Region: String,
    Latitude: Number,
    Longitude: Number
  });

  module.exports = mongoose.model('Town', townSchema);