// node countletter.js should look like this
/**  
 * {
 * l: 1,
  i: 2,
  g: 1,
  h: 4,
  t: 2,
  o: 2,
  u: 2,
  s: 2,
  e: 3,
  n: 1,
 * }
*/
function countLetters(str){
  var result = {};
// read the sentence into a new object
  str.split('').forEach(function(i){
    if(i !== ' ')
      result[i] = result[i] ? result[i]+1 : 1;
  });
  return result;
}
// outputs the object with a sentence
console.log(countLetters("lighthouse in the house"));
