var args = process.argv[2];

function ofuscate(args){
  var result = "";
  if(args.length > 0){
    for(var i = 0 ; i < args.length; i++){
      var word = args[i];
      switch(word){
        case "a":
          result += "4";
          break;
        case "e":
          result += "3";
          break;
        case "o":
          result += "0";
          break;
        case "l":
          result += "1";
          break;
        default:
          result += word;
          break;
      }
    }
    return result;
  }
  else{
    return null;
  }
}

console.log(ofuscate(args));