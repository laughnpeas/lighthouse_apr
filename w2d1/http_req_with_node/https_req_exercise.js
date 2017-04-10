'use strict'
const https = require('https');

function getAndPrintHTMLChunks(){
  let reqOption = {host: 'sytantris.github.io', path: '/http-examples/step1.html'};
  
  https.get(reqOption, (response) => {
    response.setEncoding('UTF-8');
    response.on('data', (data) => {
      console.log('data: ', data);
    });
  });
}

function getAndPrintHTML () {

  let requestOptions = {
    host: 'sytantris.github.io',
    path: '/http-examples/step2.html'
  };

  https.get(requestOptions, (response) => {
    response.setEncoding('UTF-8');
    let res = '';
    response.on('data', (data) => {
      res += data;
      console.log(res);
    });
  });

}

getAndPrintHTMLChunks();
getAndPrintHTML();