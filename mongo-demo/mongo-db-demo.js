const mongoose = require('mongoose');

//ingeneral the connection url should be feeded from configuration for security concern
mongoose.connect('mongodb://localhost/playground')
    .then(() => console.log('Connected to MongoDB..'))
    .catch(err => console.error('Could not connect to MongoDB..', err));