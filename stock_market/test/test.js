var assert = require('chai').assert;
var stockmarket = require('../app');

describe("stockmarket" , function(){
  it('should get the max value out or the array', function(){
    var arr = [40, 24, 16, 11];
    var result = stockmarket.maxProfit(arr);
    assert.strictEqual( result, 29);
  });
});