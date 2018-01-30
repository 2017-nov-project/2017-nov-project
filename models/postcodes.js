const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postcodeSchema = new Schema({
  id: Number,
  postcode: String,
  latitude: Number,
  longitude: Number
});

module.exports = mongoose.model('Postcode', postcodeSchema);