var words = ["ground", "control", "to", "major", "tom"];

function wordsMap(list, cb){
  var newArray = [];
  for(item of list){
    newArray.push(cb(item));    
  }
  return newArray;
}

function getLength(num){
  return num.length;
}
console.log("Words Map");
console.log(wordsMap(words, getLength));