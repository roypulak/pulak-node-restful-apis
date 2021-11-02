const db = require('./db');

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

//testing objects
module.exports.getProduct = function (productId) {
    return {id: productId, price: 10};
}

//testing exceptions
module.exports.registerUser = function (username) {
    if (!username)
    {
        throw new Error('Username is required.');
    }

    return {id: new Date().getTime(), username: username};
}

module.exports.applyDiscount = function (order) {
    const customer = db.getCustomerSync(order.customerId);

    if (customer.points > 10)
    {
        order.totalPrice *= 0.9;
    }
}
