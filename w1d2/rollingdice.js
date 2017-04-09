function rollingDice(param){
  var result = "";
  // rolls six sided dice as much as num of param. random num
  if(!isNaN(param))
    for(var i = 0; i < param ; ++i ){
      // get Random num between 1 to 6.
      result += (Math.floor(Math.random() * 6 ) +1);
      if(i < param - 1){
        result += ", ";
      } 
    }  
    return result;
}
// Take a single param from command line prompt - number
var  args = process.argv[2];

// output result of that.
console.log("Rolled Dice: " + args + " times. ", rollingDice(args));