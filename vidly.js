const Joi = require('joi');
const genres = require('./routes/vidly/genres');
const express = require('express');
const app = express();

app.use(express.json());
app.use('/api/vidly/genres', genres);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));