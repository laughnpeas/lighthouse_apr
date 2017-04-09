// using for loop
var maxValue = function(arr){
  var max = 0, maxItem;
  for(var currentItem of arr){
    for(var nextItem of arr){
      if(currentItem < nextItem) currentItem = nextItem;
    }
    maxItem = currentItem;
  }
  return maxItem; 
};
// findin max profit
function maxProfit(arr){
  var result = [];
  arr.forEach(function(b){
    for(var a of arr){
      result.push(a - b);
    }
  });
  return maxValue(result);
}
console.log(maxProfit([40, 24, 16, 11]));

module.exports = {"maxProfit": maxProfit}