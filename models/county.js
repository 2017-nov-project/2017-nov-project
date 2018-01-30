const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const countySchema = new Schema({
  Name: String
})



module.exports = mongoose.model('county', countySchema);