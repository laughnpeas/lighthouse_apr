'use strict'
let assert = require('chai').assert;
let gitDownload = require('../githubDownloader');

describe('GithubDownloader', function() {
  let folderName = 'avatars';
  let checkFolder = gitDownload.checkFolder;
// with node download_avatars.js nodejs node 
  it(`should find a folder called ${folderName} in my current directory`, function(){
    assert.isTrue(checkFolder(`${folderName}`, `folder ${folderName} exists`));
  });
  it(`The ${folderName} folder should contain images corresponding to the avatars of the contributors of the repo`, function(){
    let sampleArr = ["megacat-2.png", "megacat.jpg", "tyler-parkinson-megacat-tyler-parkinson.jpg"];
    let listFiles = gitDownload.listFiles;
    assert.equal(listFiles(`${folderName}`, sampleArr));
  });
  // it(`should download a file to the ${folderName}`, function(){
  //   let url = `https://sytantris.github.io/http-examples/future.jpg`;
  //   let fileName = `future.jpg`;
  //   let downloadFile = gitDownload.downloadFile;
  //   let dir = "avatars";
  //   assert.equal(downloadFile(`${url}`, dir, fileName));
  // });
});
describe('getDownload', function() {
  it(`list files from github`, function(){
    let target = 'avatars';
    let getDownload = gitDownload.getDownload;
    assert.equal(getDownload(), "");
  });
});