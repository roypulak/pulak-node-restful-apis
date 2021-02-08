const mongoose = require('mongoose')
const Joi = require('joi');
const genres = require('./routes/vidly/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/vidly/genres', genres);

mongoose.connect('mongodb://localhost/vidly')
.then(() => console.log('Connected to MongoDB..'))
.catch(err => console.error('Could not connect to MongoDB..', err))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));