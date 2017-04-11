'use strict'
let request = require('request');
let fs = require('fs'); 
let GITHUB_USER = "laughnpeas";
let GITHUB_TOKEN = "d5c5e97fadbe28a9675e2ca078f651cbf15bb13e";

function getRepoContributors(repoOwner, repoName, cb) {
let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;
  if(repoOwner === undefined){
    console.log('Please, enter repo owner name');
    return;
  }

  if(repoName === undefined){
    console.log('Please, enter repo name');
    return;
  }
  let options = {
      uri: requestURL,
      method: 'GET',
      headers: {'user-agent':'LHL_Student Exercise'}
    };
  request(options, (err, res, body) => {
    if(err){
      console.log(err.message);
      return;
    }
    const contribs = JSON.parse(body);
    contribs.forEach((entry) => {
      let filePath = `${entry.login}.jpg`
      try{
        cb(entry.avatar_url, filePath);
      }catch(err){
        console.log(`Failed to Download Image by Url ${err}`);
      }
    });
  });
}

function listImgURL(entry, cb){
  entry.forEach( (item) => {
    let filePath = `${item.login}.jpg`
    try{
      cb(item.avatar_url, filePath);
    }catch(err){
      console.log(`Failed to Download Image by Url ${err}`);
    }
  });
}

function checkFolder(path){
  return fs.existsSync(path);
}

function downloadImageByURL(url, filePath) {
  let dir = './avatars';
  if(!checkFolder(dir)){
    fs.mkdir(dir);
  }
  filePath = dir+'/'+filePath;

  request.get(`${url}`)
    .on('error', (error) => {
      return console.error(`Failed to download file : error: ${error}`);
    })
    .on('response', (response) => {
      console.log('Response Status Message: ', response.statusMessage);
    })
    .on('end', (end) =>{
      console.log('Download complete.');
    })
    .pipe(fs.createWriteStream(filePath));
      console.log('Downloading image...');
}

getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);