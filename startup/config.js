const dotenv = require('dotenv');
const config = require('config');

module.exports = function () {
    dotenv.config();
    if (!process.env.VIDLY_JWT_PRIVATE_KEY) {
        throw new Error('FATAL ERROR: VIDLY_JWT_PRIVATE_KEY is not defined.');
    }
}