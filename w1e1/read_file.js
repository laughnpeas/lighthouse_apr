var fs = require("fs");

var filePath = process.argv[2];

fs.readFile(filePath, function(err){
  if(err){
    throw err;
  }
  console.log("Successfully read from", filePath);
});