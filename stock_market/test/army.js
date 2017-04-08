function makeArmy() {
  var shooters = []
  for(var i = 0; i < 10; i++) {
    (function(i){ 
      var shooter = function() { 
       console.log(i);
      }
      shooters.push(shooter)    
    })(i);
  }
  return shooters;
}

var army = makeArmy();
army[5](); // 5