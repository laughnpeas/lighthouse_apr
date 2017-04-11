'use strict'

let request = require('request');
let fs = require('fs'); 
let GITHUB_USER = "laughnpeas";
let GITHUB_TOKEN = "d5c5e97fadbe28a9675e2ca078f651cbf15bb13e";

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

    //Iterate through body in response, download image files with URL
    JSON.parse(body).forEach((entry) => {
      let filePath = `${entry.login}.jpg`
      try{
        cb(entry.avatar_url, filePath);
      }catch(err){
        console.log(`Failed to Download Image by Url ${err}`);
      }
    });
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
// Support command line args
getRepoContributors(process.argv[2], process.argv[3], downloadImageByURL);