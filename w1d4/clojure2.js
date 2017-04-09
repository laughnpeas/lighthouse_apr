var wrapLog = function (callback, name) {
  
  return function(){
    var va = arguments[0];
    var vb = arguments[1];
    console.log(name+"("+va+","+vb+") => " + sum(va, vb));
  }
};

var sum = function (a,b) { 
  arguments[0] = a;
  arguments[1] = b;
  var result = a + b;
  arguments[2] = result;
  return result;
};
var logSum = wrapLog(sum, "sum");

logSum(5,3); // sum(5,3) => 8
logSum(3,2); // sum(3,2) => 5