
var students = [
  { id: 1, name: "bruce",    age: 40 },
  { id: 2, name: "zoidberg", age: 22 },
  { id: 3, name: "alex",     age: 22 },
  { id: 4, name: "alex",     age: 30 }
];

students.sort(function(a, b){
  var nameA = a.name.toLowerCase();
  var nameB = b.name.toLowerCase();
  if(nameA === nameB){
    // Descending by age in case of two values are equal.
    return a.age > b.age ? -1 : 1 ; 
  }else{
    // Ascending by age in case of two values are equal.
    return nameA > nameB ? 1 : -1 ;
  }
});

console.log(students);