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

exports.isUrlInList = function(url) {
  exports.readListOfUrls((data) => {
    console.log('data inside isUrlInList', data);
    console.log('url inside isUrlInList', url);
    for (var i = 0; i < data.length; i++) {
      if (data[i].includes(url)) {
        return true;
      }
    }

    return false;
  });
  //call readListofURLs passing a callback
  //check if url is in return value (array)
  //pass boolean result to callback
};

exports.addUrlToList = function(url, callback) {
  if (!exports.isUrlInList(url)) {
    //open the file
    fs.open(exports.paths.list, 'w', (err,fd) => {
      if (err) {
        console.log('error opening file to add URL to list.');
      }
      fs.write(fd, url, (err) => {
        if (err) {
          console.log ('error wrting new URL to list.');
        } else {
          console.log('wrote new url: ' + url + ' to list.');
          fs.close(fd, (err) => {
            if (err) {
              callback(false);
            } else {
              callback(true);
            }
          });
        }
      });
    });
    //add the url to the file (write a line)
    //call callback and pass in info about success or error
    //close file

  }
};

exports.isUrlArchived = function(url, callback) {
};

exports.downloadUrls = function(urls) {
};
