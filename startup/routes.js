const express = require('express');
const genres = require('../routes/vidly/genres');
const customers = require('../routes/vidly/customers');
const movies = require('../routes/vidly/movies');
const rentals = require('../routes/vidly/rentals');
const users = require('../routes/vidly/users');
const auth = require('../routes/vidly/auth');
const returns = require('../routes/vidly/returns');
const errorMiddlewire = require('../middleware/error');

module.exports = function (app) {
    app.use(express.json());
    app.use('/api/vidly/genres', genres);
    app.use('/api/vidly/customers', customers);
    app.use('/api/vidly/movies', movies);
    app.use('/api/vidly/rentals', rentals);
    app.use('/api/vidly/users', users);
    app.use('/api/vidly/auth', auth);
    app.use('/api/vidly/returns', returns);
    app.use(errorMiddlewire);
}