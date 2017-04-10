'use strict'
let getHTML = require('../http_functions').getHTML;

function printLowercase (html) {
 let result = html.toLowerCase();
 console.log('result: ', result);
  
}

let requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step4.html'
};

getHTML(requestOptions, printLowercase);