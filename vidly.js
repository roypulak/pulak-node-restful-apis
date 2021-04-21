require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');
const errorMiddlewire = require('./middleware/error');
const dotenv = require('dotenv');
const config = require('config');
const mongoose = require('mongoose');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const genres = require('./routes/vidly/genres');
const customers = require('./routes/vidly/customers');
const movies = require('./routes/vidly/movies');
const rentals = require('./routes/vidly/rentals');
const users = require('./routes/vidly/users');
const auth = require('./routes/vidly/auth');
const express = require('express');
const app = express();

winston.handleExceptions(
    new winston.transports.File({filename: 'uncauchtException.log'}));

process.on('unhandledRejection', (ex) => {
    throw ex;
});

winston.add(new winston.transports.File({ filename: 'logfile.log'}));
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

app.use(express.json());
app.use('/api/vidly/genres', genres);
app.use('/api/vidly/customers', customers);
app.use('/api/vidly/movies', movies);
app.use('/api/vidly/rentals', rentals);
app.use('/api/vidly/users', users);
app.use('/api/vidly/auth', auth);
app.use(errorMiddlewire);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));

exports.mongoose = mongoose;