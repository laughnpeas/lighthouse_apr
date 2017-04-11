'use strict'
const https = require('https');

function getHTML (options, callback) {
  https.get(options, (response) => {
    let res = '';
    response.setEncoding('UTF-8');
    response.on('data', (data) => {
      res += data;
      callback(res);
    });
  });
}

function printHTML (html) {
  console.log(html);
}

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step4.html'
};

getHTML(requestOptions, printHTML);