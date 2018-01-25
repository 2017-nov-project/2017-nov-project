const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postcodeSchema = new Schema({
  status: Number,
  result: {
    postcode: String,
    quality: Number,
    eastings: Number,
    northings: Number,
    country: String,
    nhs_ha: String,
    longitude: Number,
    latitude: Number,
    european_electoral_region: String,
    primary_care_trust: String,
    region: String,
    lsoa: String,
    msoa: String,
    incode: String,
    outcode: String,
    parliamentary_constituency: String,
    admin_district: String,
    parish: String,
    admin_county: String,
    admin_ward: String,
    ccg: String,
    nuts: String,
    codes: {
      admin_district: String,
      admin_county: String,
      admin_ward: String,
      parish: String,
      parliamentary_constituency: String,
      ccg: String,
      nuts: String
    }
  }
});

module.exports = mongoose.model('Postcode', postcodeSchema);