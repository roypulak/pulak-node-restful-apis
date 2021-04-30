const dotenv = require('dotenv');
const config = require('config');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();

require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();

dotenv.config();
if (!process.env.VIDLY_JWT_PRIVATE_KEY) {
    console.error('FATAL ERROR: VIDLY_JWT_PRIVATE_KEY is not defined.');
    process.exit(1);
}

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));