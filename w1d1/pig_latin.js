var args = process.argv.slice(2);

var result = "";

if(args.length > 0 ){
  for(var i = 0; i < args.length; i++){
    var param = args[i];
    for (var j = 0; j < param.length - 1; j++){
      result += param[j+1];
    }
    result += param[0] + "ay" + " ";
  }
}else{
  return null;
}
console.log(result);