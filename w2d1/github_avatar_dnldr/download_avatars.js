var request = require('request');
var GITHUB_USER = "laughnpeas";
var GITHUB_TOKEN = "d5c5e97fadbe28a9675e2ca078f651cbf15bb13e";

var requestURL = 'https://'+ GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';

function getRepoContributors(repoOwner, repoName, cb) {
}

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});