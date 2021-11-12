const lib = require('../testing-demo/lib');
const db = require('../testing-demo/db');
const mail = require('../testing-demo/mail');

describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    });

    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    });

    it('should return 0 if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    });
});

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Pulak');
        
        expect(result).toMatch(/Pulak/);
        expect(result).toContain('Pulak');
    });
});

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');

        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    });
});

describe('getProduct', () => {
    it('should return the product with the given id', () => {
        const result =  lib.getProduct(1);

        expect(result).toMatchObject({ id: 1, price: 10 });
    });
});

describe('registerUser', () => {
    it('should throw if username is falsy', () => {
        const args = [null, undefined, NaN, '', 0, false];

        args.forEach(a => {
            expect(() => { lib.registerUser(a) }).toThrow();
        });
    });

    it('should return a user object if valid username is passed', () =>{
        const result = lib.registerUser('pulak');
        expect(result).toMatchObject({username: 'pulak'});
        expect(result.id).toBeGreaterThan(0);
    });
});

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {
        //Mock functions
        db.getCustomerSync = function (customerId) {
            console.log('Fake reading customer');
            return {id: customerId, points: 20};
        }
        
        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    });
});

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        db.getCustomerSync = function (customerId) {
          return {email: 'example@gmail.com'};  
        };

        let mailSent = false;
        mail.send = function(email, message){
            mailSent = true;
        };     

        lib.notifyCustomer({customerId: 1});
        expect(mailSent).toBe(true);
    });
});
