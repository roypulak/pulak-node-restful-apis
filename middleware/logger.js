function log(req, res, next) {
    console.log('Logging...');
    //following statement passes the control to the next middlewire 
    next();
}

module.exports = log;