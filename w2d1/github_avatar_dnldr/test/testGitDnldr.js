'use strict'
let assert = require('chai').assert;
let gitDownload = require('../download_avatar');

describe('download_avatar', function() {
  let folderName = 'avatars';
  let checkFolder = gitDownload.checkFolder;
// with node download_avatars.js nodejs node 
  it(`should find a folder called ${folderName} in my current directory`, function(){
    assert.isTrue(checkFolder(`${folderName}`, `folder ${folderName} exists`));
  });
});
describe('downloadImageByURL', function() {
  it(`should download images from the url `, function(){
    let target = 'avatars';
    let downloadImageByURL = gitDownload.downloadImageByURL;
    assert.equal(downloadImageByURL(), "");
  });
});