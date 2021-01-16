const Joi = require('joi');
const logger = require('./logger');
const authenticator = require('./authenticate');
const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
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

//Configuration
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail.host'));
//console.log('Mail Password: ' + config.get('mail.password'));

//alternate way to read environment variable for instance: process.env.NODE_ENV
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    console.log('Morgan enabled...');
}

const courses = [
    { id: 1, name: 'course1' },
    { id: 2, name: 'course2' },
    { id: 3, name: 'course3' },
];

app.get('/', (req, res) => {
    //return res.send('Hello World!!');
    return res.render('index', { title: 'My Express App', message: 'Hello' });
});

app.get('/api/courses', (req, res) => {
    return res.send(courses);
})

app.get('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).send('The course with the given ID was not found.');
    }

    return res.send(course);
});

app.post('/api/courses', (req, res) => {
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name
    };

    courses.push(course);
    return res.send(course);
});

app.put('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        return res.status(404).send('The course with the given ID was not found.');
    }

    //object destructuring : since we are interested only on error property
    const { error } = validateCourse(req.body);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    course.name = req.body.name;
    return res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));

    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
    }

    const index = courses.indexOf(course);
    courses.splice(index, 1);

    return res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });

    return schema.validate(course);
}

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));