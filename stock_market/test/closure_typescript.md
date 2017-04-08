# Closures



* Closures are one of the most powerful features available at runtime, but they are also one of the most misunderstood. The Mozilla developer network defines closures as follows:

* "Closures are functions that refer to independent (free) variables. In other words, the function defined in the closure 'remembers' the environment in which it was created."

We understand independent (free) variables as variables that persist beyond the lexical scope from which they were created. Let's take a look at an example:
```js
function makeArmy() {
  var shooters = []
  for(var i = 0; i < 10; i++) {
    var shooter = function() { // a shooter is a function
      alert(i) // which should alert it's number
    }
    shooters.push(shooter)    
  }
  return shooters;
}
```
We have declared a function named makeArmy. Inside the function, we have created an array of functions named shooters. Each function in the shooters array will alert a number, the value of which was set from the variable i inside a for statement. We will now invoke the makeArmy function:

```js
var army = makeArmy();
The army variable should now contain the array of functions shooters. However, we will notice a problem if we execute the following piece of code:

army[0](); // 10 (expected 0)
army[5](); // 10 (expected 5)

```

The preceding code snippet does not work as expected because we made one of the most common mistakes related to closures. When we declared the shooter function inside the makeArmy function, we created a closure without knowing it.

The reason for this is that the functions assigned to shooter are closures; they consist of the function definition and the captured environment from the makeArmy function's scope. Ten closures have been created, but each one shares the same single environment. By the time the shooter functions are executed, the loop has run its course and the i variable (shared by all the closures) has been left pointing to the last entry (10).

One solution in this case is to use more closures:

```js
function makeArmy() {
  var shooters = []
  for(var i = 0; i < 10; i++) {
    (function(i){ 
      var shooter = function() { 
        alert(i);
      }
      shooters.push(shooter)    
    })(i);
  }
  return shooters;
}

var army = makeArmy();
army[0](); // 0
army[5](); // 5

```

This works as expected. Rather than the shooter functions sharing a single environment, the immediately invoked function creates a new environment for each one, in which i refers to the corresponding value.

## Static variables with closures

In the previous section, we saw that when a variable is declared in a closure context it can be shared between multiple instances of a class, or in other words, the variable behaves as a static variable.

We will now see how we can create variables and methods that behave like static variables. Let's start by declaring a TypeScript class named Counter:

```js
class Counter {
  private static _COUNTER = 0;
  constructor() {}
  private _changeBy(val) {
    Counter._COUNTER += val;
  }
  public increment() {
    this._changeBy(1); 
  }
  public decrement() {
    this._changeBy(-1);
  }
  public value() {
    return Counter._COUNTER;
  }
}
```
The preceding class contains a static member named _COUNTER. The TypeScript compiler transforms it into the following resulting code:

```js
var Counter = (function () {
    function Counter() {
    }
    Counter.prototype._changeBy = function (val) {
        Counter._COUNTER += val;
    };
    Counter.prototype.increment = function () {
        this._changeBy(1);
    };
    Counter.prototype.decrement = function () {
        this._changeBy(-1);
    };
    Counter.prototype.value = function () {
        return Counter._COUNTER;
    };
    Counter._COUNTER = 0;
    return Counter;
})();
```
As you can observe, the static variable is declared by the TypeScript compiler as a class property (as opposed to an instance property). The compiler uses a class property because class properties are shared across all instances of a class.

Alternatively, we could write some JavaScript (remember that all valid JavaScript is valid TypeScript) code to emulate static properties using closures:

```js
var Counter = (function() {
    // closure context
    var _COUNTER = 0;

    function changeBy(val) {
        _COUNTER += val;
    }
    
    function Counter() {};
   
    Counter.prototype.increment = function() {
      changeBy(1); 
    };
    Counter.prototype.decrement = function() {
      changeBy(-1);
    };
    Counter.prototype.value = function() {
      return _COUNTER;
    };
    return Counter;
})();
```
The preceding code snippet declares a class named Counter. The class has some methods used to increment, decrement, and read the variable named _COUNTER. The _COUNTER variable itself is not part of the object prototype.

The Counter constructor function is part of a closure. As a result, all the instances of the Counter class will share the same closure context, which means that the context (the variable counter and the function changeBy) will behave as a singleton.

Note
The singleton pattern requires an object to be declared as a static variable to avoid the need to create its instance whenever it is required. The object instance is, therefore, shared by all the components in the application. The singleton pattern is frequently used in scenarios where it is not beneficial, which introduces unnecessary restrictions in situations where a unique instance of a class is not actually required, and introduces global states into an application.

So, you now know that it is possible to use closures to emulate static variables:

```js
var counter1 = new Counter();
var counter2 = new Counter();
console.log(counter1.value()); // 0
console.log(counter2.value()); // 0
counter1.increment();
counter1.increment();
console.log(counter1.value()); // 2
console.log(counter2.value()); // 2 (expected 0)
counter1.decrement();
console.log(counter1.value()); // 1
console.log(counter2.value()); // 1 (expected 0)
Private members with closures
```

We have seen that the closure function can access variables that persist beyond the lexical scope from which they were created. These variables are not part of the function prototype or body, but they are part of the closure function context.

As there is no way to directly access the context of a closure function, the context variables and methods can be used to emulate private members. The main advantage of using closures to emulate private members (instead of the TypeScript private access modifier) is that closures will prevent access to private members at runtime.

TypeScript avoids emulating private properties at runtime. The TypeScript compiler will throw an error at compilation time if we attempt to access a private member.

However, TypeScript avoids the use of closures to emulate private members to improve the application performance. If we add or remove an access modifier to or from one of our classes, the resulting JavaScript code will not change at all. This means that private members of a class become public members at runtime.

However, it is possible to use closures to emulate private properties at runtime. Just like when we emulated a static variable using closures, we can only achieve this kind of advanced control over the behavior of closures by writing pure JavaScript. Let's take a look at an example:

```js
function makeCounter() {

    // closure context
    var _COUNTER = 0;
    function changeBy(val) {
        _COUNTER += val;
    }
    
    function Counter() {};
    
    Counter.prototype.increment = function() {
      changeBy(1); 
    };
    Counter.prototype.decrement = function() {
      changeBy(-1);
    };
    Counter.prototype.value = function() {
      return _COUNTER;
    };
    return new Counter();
};
```
The preceding class is almost identical to the class that we previously declared to demonstrate how to emulate static variables at runtime using closures.

This time, a new closure context is created every time we invoke the makeCounter function, so each new instance of Counter will remember an independent context (counter and changeBy):

```js
var counter1 = makeCounter();
var counter2 = makeCounter();
console.log(counter1.value()); // 0
console.log(counter2.value()); // 0
counter1.increment();
counter1.increment();
console.log(counter1.value()); // 2
console.log(counter2.value()); // 0 (expected 0)
counter1.decrement();
console.log(counter1.value()); // 1
console.log(counter2.value()); // 0 (expected 0) 
```

Since the context cannot be accessed directly, we can say that the variable counter and the changeBy function are private members:

```js
console.log(counter1.counter); // undefined
counter1.changeBy(2); // changeBy is not a function
console.log(counter1.value()); // 1
```