const omit = require('object.omit');
const fs = require('fs');
const selectedPostcodes = require('./selectedPostcodes.js');

const arr = selectedPostcodes.map(element => {
    return omit(element, '_id')
} )

fs.writeFile('postcodesUpdated.js', JSON.stringify(arr), err => {
    if(err) throw err;
})