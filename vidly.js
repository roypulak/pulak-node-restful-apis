require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const dotenv = require('dotenv');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const app = express();
require('./startup/routes')(app);

winston.handleExceptions(
    new winston.transports.File({ filename: 'uncauchtException.log' }));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log' }));
winston.add(new winston.transports.MongoDB(
    {
        db: 'mongodb://localhost/vidly',
        level: 'error'
    }
));

const p = Promise.reject(new Error('Something failed miserably!'));
p.then(() => console.log('Done'));

dotenv.config();
if (!process.env.VIDLY_JWT_PRIVATE_KEY) {
    console.error('FATAL ERROR: VIDLY_JWT_PRIVATE_KEY is not defined.');
    process.exit(1);
}


mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

exports.mongoose = mongoose;