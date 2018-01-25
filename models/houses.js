const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const houseSchema = new Schema({
    gov_unique_id: String,
    price_paid: Number,
    deed_date: String,
    postcode: String,
    property_type: String,
    new_build: String,
    estate_type: String,
    saon: String,
    paon: String,
    street: String,
    locality: String,
    town: String,
    district: String,
    county: String,
    transaction_category: String,
    linked_data_uri: String
  });

  module.exports = mongoose.model('House', houseSchema);