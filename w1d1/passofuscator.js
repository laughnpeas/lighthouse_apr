var args = require('optimist').argv.password;
function ofuscate(args){
  var result = "";

  if(args.length > 0){
    for(var i = 0 ; i < args.length; i++){
      var word = args[i];
      if(word === "a"){
        word = "4";
      }
      if(word === "e"){
        word = "3";
      }
      if(word === "o"){
        word = "0";
      }
      if(word === "l"){
        word = "1";
      }            
      result+=word;
    }
    return result;
  }else{
    return null;
  }
}

console.log(ofuscate(args));