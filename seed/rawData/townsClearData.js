const _ = require('underscore');
const fs = require('fs');

const mongoose = require('mongoose');
const { Town } = require('../../models/');

const clearData = () => {
  Town.find().lean()
    .then((townsData) => {
      townsData = townsData.map(townData => _.omit(townData, ['population', '_id']));
      fs.writeFileSync("townsData.json", JSON.stringify(townsData, null, 4));
    })
}