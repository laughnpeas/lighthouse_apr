function findWaldo(arr, found){
  //for(var i in arr){
  arr.forEach(function(entry, index){
    if(entry === "Waldo"){
      found(index);
    }
  });
}


function actionWhenFound(where){
  console.log("Found him! at " + 
    where+ " I mean "+ (Number(where)+1));
}

findWaldo(["Alice", "Bob", "Waldo", "Winston"], actionWhenFound);
