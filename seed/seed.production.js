const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
require('dotenv').config({ path: `./.env.production` });
const { SOURCE, USERNAME, PASSWORD } = process.env;

fs.readdir(path.join(__dirname, './currentData/housesData'), (err, files) => {
  if (err) throw err;
  files.map(file => {
    console.log(`file: ${file}`)
    exec(`mongoimport -h ${SOURCE} -d housing-heatmap -c houses --type csv --file ./seed/currentData/housesData/${file} --fields gov_unique_id,pricepaid,deed_date,postcode,property_type,new_build,estate_type,paon,saon,street,locality,town,district,county,transaction_category,record_status -u ${USERNAME} -p ${PASSWORD}`, err => {
      if (err) throw err;
      console.log(`File ${file} content added to db!`)
    })
  })
})