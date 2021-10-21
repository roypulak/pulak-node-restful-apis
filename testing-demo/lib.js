// Testing numbers 
module.exports.absolute = function (number) {
    return (number >= 0) ? number : -number;
}

//testing string
module.exports.greet = function (name) {
    return 'Welcome ' + name + '!';  
}

//testing arrays
module.exports.getCurrencies = function() {
    return ['USD', 'AUD', 'EUR'];
}