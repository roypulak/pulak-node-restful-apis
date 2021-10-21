const exercise1 = require('../testing-demo/exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { exercise1.fizzBuzz('ab1') }).toThrow();
        expect(() => { exercise1.fizzBuzz(null) }).toThrow();
        expect(() => { exercise1.fizzBuzz(undefined) }).toThrow();
        expect(() => { exercise1.fizzBuzz({}) }).toThrow();
    });

    it('should return FizzBuzz if input is divisible by 3 and 5', () => {
        const result = exercise1.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    });

    it('should return Fizz if input is only divisible by 3', () => {
        const result = exercise1.fizzBuzz(9);
        expect(result).toBe('Fizz');
    });

    it('should return Buzz if input is only divisible by 5', () => {
        const result = exercise1.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });

    it('should return input if input is not divisible by 3 or 5', () => {
        const result = exercise1.fizzBuzz(5);
        expect(result).toBe('Buzz');
    });
});