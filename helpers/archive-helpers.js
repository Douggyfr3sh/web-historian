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
  list: path.join(__dirname, '../archives/sites.txt'),
  index: path.join(__dirname, '../web/public/index.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.getHTMLfile = function (url, cb, isLocal) {
  if (isLocal) {
    fs.readFile(url, 'utf8', cb);
  }
};

exports.readListOfUrls = function(callback) {
  //open the file
  exports.getHTMLfile(exports.paths.list, (err, data) => {
    if (err) { console.log('error in readFile'); }
    console.log('data in readListofUrls', data);
    callback(data.split("\n"));
  }, true);
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls((data) => {
    console.log('data inside isUrlInList', data);
    console.log('url inside isUrlInList', url);
    for (var i = 0; i < data.length; i++) {
      if (data[i] === url) {
        cb(true);
        return;
      }
    }

    cb(false);
  });
  //call readListofURLs passing a callback
  //check if url is in return value (array)
  //pass boolean result to callback
};

exports.addUrlToList = function(url, callback) {
  exports.isUrlInList(url, (isInList) => {
    if (!isInList) {
      //open the file
      fs.open(exports.paths.list, 'w', (err,fd) => {
        if (err) {
          console.log('error opening file to add URL to list.');
        }
        //write the new url to the list
        fs.write(fd, url, (err) => {
          if (err) {
            console.log ('error wrting new URL to list.');
          } else {
            console.log('wrote new url: ' + url + ' to list.');
            //close the file when done
            fs.close(fd, (err) => {
              if (err) {
                callback(false);
              } else {
                callback(true);
              }
            });
          }
        });    // <---- is this what "callback hell" is?
      });
    }
  });
};

exports.isUrlArchived = function(url, callback) {
  //read the file
  fs.readFile(exports.paths.archivedSites + '/' + url, 'utf8', (err, data) => {
    //execute callback on boolean result
    if (err) {
      callback(false);
    } else  {
      callback(true);
    }
  });
};

exports.downloadUrls = function(urls) {
};
