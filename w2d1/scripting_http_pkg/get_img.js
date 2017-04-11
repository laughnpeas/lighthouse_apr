'use strict'

let request = require('request');
let fs = require('fs');

request.get('https://sytantris.github.io/http-examples/future.jpg')
      .on('error', (error) => {
        throw error;
      })
      .on('response', (response) => {
        console.log('Response Status Message: ', response.statusMessage);
      })
      .on('end', (end) =>{
        console.log('Download complete.');
      })
      .pipe(fs.createWriteStream('./future.jpg'));
       console.log('Downloading image...');

