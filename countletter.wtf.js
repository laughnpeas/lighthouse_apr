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
// read the sentence, get rid of spaces
  var words = str.split(' ').join('');
  console.log("Words: " + words);
  for(letter of words){
// for( var i = 0; i < words.length ; ++i){
      result[letter] = count(str, result);
  }
  console.log("Result: " + result);
  return result;
}

function count(str, obj){
    var countLetter = 0;
    for(letter in obj){
      //count the letters 
      // put letters into the result
      countLetter += str.match(letter).length;
      console.log("count Letter: " + letter);
    }

}
//TODO: outputs the object with a sentence
console.log(countLetters("lighthouse in the house"));
