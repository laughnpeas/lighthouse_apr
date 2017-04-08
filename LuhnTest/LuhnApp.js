function addOddNumbers(num){
  var tempArr = num.toString().split("");
  return addNumbers(tempArr);
}

function checkToNine(num){
  return num > 9 ? num-9 : num; 
}

var addNumbers = function(array){
  var result = 0;
  for(index in array){
    if(index % 2 == 1){
      result += checkToNine(Number(array[index]) * 2);
    } 
  }
  return result;
};

function checkSum(num){
  return (num % 10 === 0)
}
exports.checkToNine = checkToNine; 
exports.addOddNumbers = addOddNumbers; 
exports.checkSum = checkSum; 
