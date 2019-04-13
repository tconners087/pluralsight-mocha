var assert = require('assert');
const should = require('chai').should();

describe('Basic Mocha Test', function() {
    it('should deal with objects', function() {
        var obj = {
            name: 'Taylor',
            gender: 'Male'
        };
        var objB = {
            name: 'Taylor',
            gender: 'Male'
        };

        obj.should.have.property('name').equal('Taylor');
        obj.should.deep.equal(objB);
    });
    it('should allow testing nulls', function() {
        // because null is not an object
        var iAmNull = null;
        should.not.exist(iAmNull);
    });
});