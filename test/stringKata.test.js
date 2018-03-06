var assert = require('assert');
var stringKata = require('../src/stringKata');

describe('String Kata', function() {
    describe('parse', function() {
        it('should return zero for an empty string', function() {
            assert.strictEqual(stringKata.parse(""), 0);
        });

        it('should return a single number if a single number is passed', function() {
            assert.strictEqual(stringKata.parse("1"), 1);
            assert.strictEqual(stringKata.parse("3"), 3);
        });

        it('should return a single number from a string containing two numbers', function() {
            assert.strictEqual(stringKata.parse("3,4"), 7);
        });

        it('should return the sum of the numbers delimited by a comma', function() {
            assert.strictEqual(stringKata.parse("3,4,5"), 12);
        });

        it('should return the sum of the numbers delimiters comma and newline', function() {
            assert.strictEqual(stringKata.parse("3,4\n5"), 12);
        });

        it('should return the sum of the numbers by a custom delimiters comma and newline', function() {
            assert.strictEqual(stringKata.parse("//;\n1;2"), 3);
        });

        it('should throw an exception on negative numbers', function() {
            assert.throws(function(){
                    stringKata.parse("-1,2,-3")
                }, /no negatives/);
        });

        it('should ignore values greater than 1000', () => {
            assert.strictEqual(stringKata.parse("1,10000,23444,4,1000,999,1001"), 1004);
        });

        it('should work with delimiters of any length', () => {
            assert.strictEqual(stringKata.parse("//[***]\n1***2***3"), 6)
        });

        it('should work with multiple delimiters of single length', () => {
            assert.strictEqual(stringKata.parse("//[*][%]\n1*2%3"), 6)
        });

        it('should work with multiple delimiters of any length', () => {
            assert.strictEqual(stringKata.parse("//[***][#][%]\n1***2#3%4"), 10)
        });

        it('should work with multiple delimiters of any length bb', () => {
            assert.strictEqual(stringKata.parse("1***2*%*$3"), 1)
        });

        it('should work with multiple delimiters including numbers', () => {
            assert.strictEqual(stringKata.parse("//[*1*][%]\n1*1*2%3"), 6)
        });
    })
});
