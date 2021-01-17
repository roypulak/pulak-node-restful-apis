const Joi = require('joi');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
const logger = require('./middleware/logger');
const authenticator = require('./middleware/authenticate');
const courses = require('./routes/courses');
const home = require('./routes/home');
const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.set('views', './views'); //default

//enable the app to fetch request body. Bydefault it is not enabled
app.use(express.json());
//enable the app to fetch url encoded payload
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(authenticator);
app.use(express.static('public'));
app.use(helmet());
app.use('/api/courses', courses);
app.use('/', home);

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));

//alternate way to read environment variable for instance: process.env.NODE_ENV
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));