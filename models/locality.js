const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const localitySchema = new Schema({
  Name: String
})


module.exports = mongoose.model('locality', localitySchema);