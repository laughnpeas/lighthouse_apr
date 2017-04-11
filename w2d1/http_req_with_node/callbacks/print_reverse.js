'use strict'
let getHTML = require('../http_functions').getHTML;

function printReverse(html) {
 let result = html.split("").reverse().join();
 console.log(reverseString(html));
  
}

function reverseString(str) {
  return (str === '') ? '' : reverseString(str.substr(1)) + str.charAt(0);
}

let requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step4.html'
};

getHTML(requestOptions, printReverse);