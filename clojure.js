function makeIdGenerator(){
  var id = 0;
  return function(){
    id+=1;
    return id;
  }
}

var nextId = makeIdGenerator();

// console.log(nextId());
// console.log(nextId());
// console.log(nextId());

var rollDie = function () {
  return Math.floor(1 + Math.random() * 6);
}

var list = [5, 4, 6, 1, 6, 4, 2, 3, 3, 5];
function makeLoadedDie() {
  var id = 0; 
  return function(){
    return list[id++];
  }
}

var rollLoadedDie = makeLoadedDie();

// console.log(rollLoadedDie());  // 5
// console.log(rollLoadedDie());  // 4
// console.log(rollLoadedDie());  // 6

//console.log(rollDie());  // 1 (for example)

var countdownGenerator = function (x) {
  /**
   * takes in a number x and returns a function
   * counts down when it is called
   */ 
  return function(){
    var num = x--;
    var result = (num>0) ? "T-minus "+ num + "..." 
    : (num==0) ? "Blast Off!" 
    : "Rockets already gone, bub!";
    console.log(result);
  }
};

var countdown = countdownGenerator(3);
countdown(); // T-minus 3...
countdown(); // T-minus 2...
countdown(); // T-minus 1...
countdown(); // Blast Off!
countdown(); // Rockets already gone, bub!
countdown(); // Rockets already gone, bub!