var assert = require("chai").assert;
var LuhnApp = require("../LuhnApp");

describe("LuhnGenerate", function(){
 it("should return true if sum of the odd numbers is 14", function(){
    var num = 6047206594;
    var result = LuhnApp.addOddNumbers(num);
    assert.equal(result, 14);
  });
 it("should return true if number is greater than 9 return number subtract by 9 else return number 14", function(){
    var num = 14;
    var result = LuhnApp.checkToNine(num);
    assert.equal(result, 5);
  });
 it("should return true if number isn't greater than 9 return number 5", function(){
    var num = 5;
    var result = LuhnApp.checkToNine(num);
    assert.equal(result, 5);
  });
 it("should return true if total modulo 10 is 0 return true", function(){
    var num = 14;
    var result = LuhnApp.checkSum(num);
    assert.isTrue(result);
  });
});