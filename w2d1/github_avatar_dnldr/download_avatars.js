var request = require('request');
var GITHUB_USER = "laughnpeas";
var GITHUB_TOKEN = "d5c5e97fadbe28a9675e2ca078f651cbf15bb13e";

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
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
    listImgURL(contribs);
  });
}

function listImgURL(entry){
  entry.forEach( (item) => {
    console.log(item.avatar_url);
  });
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});