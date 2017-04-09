
var conceptList = ["gists", "types", "operators", "iteration", "problem solving"];

// Write your code here...
function joinList(conceptList){
  if(conceptList.length>0){
    var joinList = conceptList[0];
    for(var i = 1 ; i < conceptList.length ; i++){
      joinList += ", " + conceptList[i];
    }
    return joinList;
  }else{
  
    return "";
  }
  
}

 // a custom function written by you (you must define it too!)
var concepts = joinList(conceptList);

if(concepts===""){
    console.log("Empty string. Array is empty");
}
else{
    console.log("Today I learned about " + concepts + ".");
}
