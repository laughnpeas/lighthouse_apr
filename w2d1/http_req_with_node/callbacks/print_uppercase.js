'use strict'
let getHTML = require('../http_functions').getHTML;

function printUpperCase (html) {
 let result = html.toUpperCase();
 console.log('result: ', result);
  
}

let requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step4.html'
};

getHTML(requestOptions, printUpperCase);