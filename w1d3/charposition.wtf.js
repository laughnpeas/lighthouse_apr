
 var lettersArray = phrase.split("");
 var countingObject = {};
 for (var i = 0; i < lettersArray.length; i++) {
   if (countingObject.hasOwnProperty(lettersArray[i])){
     countingObject[lettersArray[i]].push(i);
   }
   else {
     countingObject[lettersArray[i]] = [];
     countingObject[lettersArray[i]].push(i);
   }
 }
 return countingObject;



console.log(showIndexOfLetters("lighthouse in the house"));