'use strict'
const https = require('https');

const getHTML = function (options, callback) {
  https.get(options, (response) => {
    let res = '';
    response.setEncoding('UTF-8');
    response.on('data', (data) => {
      res += data;
      callback(res);
    });
  });
};

module.exports = {'getHTML': getHTML}