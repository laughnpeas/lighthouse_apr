// node rollingdice.js 3 -> 1 3 6
// node rollingdice.js 0 -> 0
// node rollingdice.js j -> 0
// node rollingdice.js 

var result = "";
// Take a single param from command line prompt - number
var param = process.argv[2];

// rolls six sided dice as much as num of param. random num
if(!isNaN(param))
  for(var i = 0; i < param ; ++i ){
    result += (Math.floor(Math.random() * 6 ) +1);
    if(i < param - 1){
      result += ", ";
    } 
  }  
// get Random num between 1 to 6.
// output result of that.
console.log("Rolled Dice: " + param + " times. ", result);