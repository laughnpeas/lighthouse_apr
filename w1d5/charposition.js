function charPosition(str){
 var result = {};
 str.split("").forEach( function(obj, i){
   result.hasOwnProperty(obj) ? result[obj].push(i) : 
   (result[obj] = [], result[obj].push(i)); 
 });
 return result;
}
console.log(charPosition("lighthouse in the house"));