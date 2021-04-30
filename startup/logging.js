require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
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
}