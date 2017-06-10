var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  //open the file
  //read each line
  //push each line to an array
  //pass array to callback
  //close file
};

exports.isUrlInList = function(url, callback) {
  //call readListofURLs passing a callback
  //check if url is in return value (array)
  //pass boolean result to callback
};

exports.addUrlToList = function(url, callback) {
  //open the file
  //add the url to the file (write a line)
  //call callback and pass in info about success or error
  //close file
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
