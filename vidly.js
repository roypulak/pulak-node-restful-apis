const mongoose = require('mongoose')
const Joi = require('joi');
const genres = require('./routes/vidly/genres');
const customers = require('./routes/vidly/customers');
const movies = require('./routes/vidly/movies');
const rentals = require('./routes/vidly/rentals');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/vidly/genres', genres);
app.use('/api/vidly/customers', customers);
app.use('/api/vidly/movies', movies);
app.use('/api/vidly/rentals', rentals);

mongoose.connect('mongodb://localhost/vidly')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));