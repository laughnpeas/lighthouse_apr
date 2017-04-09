var validateDataForAge = function(data) {
 // unless person's age is less than 1 or greater than 99, then it's ok
 person = data();
 return ((person.age < 7 || person.age > 99) ? true : false);
};

var errorHandlerForAge = function(error) {
    console.log(person);
    console.log(errorMsg(person.name + "is too " + (person.age<7 ? "young" : person.age>99? "old": "") + "to be a ", scientist));
};

function errorMsg(msg, modifier) {
  console.log(msg + modifier());
}

function composer() {
  return "composer";
}

function scientist() {
  return "scientist";
}

function parseRequest(data,validateData,errorHandler) {
  var error = validateData(data);
  if (!error) {
    console.log("no errors");
  } else {
    errorHandler(data);
  }
}

var generateDataForScientist = function() {
  return {
    name: "Albert Einstein",
    age : 6,
    job : scientist
  };
};

var generateDataForComposer = function() {
  return {
    name: "J S Bach",
    age : Math.floor(Math.random() * (100 - 1)) + 1,
  };
};

//parse request
parseRequest(generateDataForScientist, validateDataForAge, errorHandlerForAge);
// parseRequest(generateDataForComposer, validateDataForAge, errorHandlerForAge);