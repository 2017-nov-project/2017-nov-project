const {seedDB} = require('./seed');
require('dotenv').config({ path: `./.env.production` })
const { DB_URL } = process.env
seedDB(DB_URL)