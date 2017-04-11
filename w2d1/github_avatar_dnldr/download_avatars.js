'use strict'

require('dotenv').config();
let request = require('request');
let fs = require('fs'); 
let GITHUB_USER = process.env.GITHUB_USER || null;
let GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;

function getRepoContributors(repoOwner, repoName, cb) {

let requestURL = `https://${GITHUB_USER}:${GITHUB_TOKEN}@api.github.com/repos/${repoOwner}/${repoName}/contributors`;

  // If the user does not specify both arguments, the program should not attempt a request. 
  // terminate with an error message letting the user know about the problem.
  if(repoOwner === undefined){
    console.log('Please, enter repo owner name');
    return;
  }
  if(repoName === undefined){
    console.log('Please, enter repo name');
    return;
  }

  //handing error when process.env can't find the information
  if(GITHUB_TOKEN === null || GITHUB_USER === null){
    console.log("You should provide Github user name and tocken");
    return;
  }

  let options = {
      uri: requestURL,
      method: 'GET',
      headers: {'user-agent':'LHL_Student Exercise'} //adding user-agent to request
    };

  request(options, (err, res, body) => {
    if(err){
      console.log(err.message);
      return;
    }
    
    try{
      //Iterate through body in response, download image files with URL
      let bodyObj = JSON.parse(body);
      for(let entry of bodyObj){
      let filePath = `${entry.login}.jpg`
        cb(entry.avatar_url, filePath);
      }
    }catch(err){
        console.log(`Failed to Download Image by Url ${err}`);
    }
 });
}

// Check if the folder exists
function checkFolder(path){
  return fs.existsSync(path);
}

// Download image file to local with url and file path
function downloadImageByURL(url, filePath) {
  let dir = './avatars';
  if(!checkFolder(dir)){
    fs.mkdir(dir);
  }
  // Add up file name and directory
  filePath = dir+'/'+filePath;
  try{
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
  }catch(err){
    console.error(err);
  }
}
// Support command line args
getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);