'use strict'
let fs = require('fs');
let request = require('request');

let options = {
    host:'api.github.com',
    path: `/repos/laughnpeas/images/contents/avatars`,
    method: 'GET',
    headers: {'user-agent':'Mozilla/4.0 (compatible; MSIE 7.0; Windows NT 6.0)'}
  };

function getDownload(target){
  if(!checkFolder(target))
    fs.createWriteStream(`./${target}`);
  console.log(listFiles());
}

function checkFolder(path){
  return fs.existsSync(`./${path}`);
}

function listFiles(){
  request(options, (error, Response, body) => {
    if(error){
      return console.error(`Couldn't retrieve content from the ${options.path} : error: ${error}`);
    }
    console.log(`API response is`);
  });
}

function downloadFile(url, dir, fileName){
  let result = request.get(`${url}`)
      .on('error', (error) => {
        return console.error(`Failed to download file : error: ${error}`);
      })
      .on('response', (response) => {
        console.log('Response Status Message: ', response.statusMessage);
      })
      .on('end', (end) =>{
        console.log('Download complete.');
      })
      .pipe(fs.createWriteStream(`./${dir}/${fileName}`));
       console.log('Downloading image...');
  // console.log(`result = ${result}`);
}

// let listFiles = getDownload(`https://sytantris.github.io/http-examples/future.jpg`, `avatars`, listFiles);
// getDownload(`https://sytantris.github.io/http-examples/future.jpg`, `avatars`, downloadFile);

module.exports = {'getDownload': getDownload, 
                  'checkFolder': checkFolder, 
                  'listFiles': listFiles,
                  'downloadFile': downloadFile,
                  'getDownload': getDownload};