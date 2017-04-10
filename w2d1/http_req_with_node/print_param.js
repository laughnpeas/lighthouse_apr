'use strict'
const https = require('https');

function getAndPrintHTML (options) {
  https.get(options, (response) => {
    let res = '';
    response.setEncoding('UTF-8');
    response.on('data', (data) => {
      res += data;
    console.log('res: ', res);
    });
  });
}

var requestOptions = {
  host: 'sytantris.github.io',
  path: '/http-examples/step3.html'
};

getAndPrintHTML(requestOptions);