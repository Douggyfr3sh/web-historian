
var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');
var httpHelpers = require('../web/http-helpers');
var Promise = require('bluebird');
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
  index: path.join(__dirname, '../web/public/index.html'),
  loading: path.join(__dirname, '../web/public/loading.html')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

// exports._getHTMLfile = function (url, cb, isLocal) {
//   if (isLocal) {
//     fs.readFile(url, 'utf8', cb);
//   }
// };

exports._readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, function(err, sites) {
    sites = sites.toString().split('\n');
    if (callback) {
      callback(sites);
    }
  });
};

exports.readListOfUrls = Promise.promisify(exports._readListOfUrls);

exports._isUrlInList = function(url, cb) {
  //var urlsArr = exports.readListOfUrls();
  exports.readListOfUrls(function(sites) {
    var found = _.any(sites, function(site, i) {
      return site.match(url);
    });
    cb(found);
  });
};

exports.isUrlInList = Promise.promisify(exports._isUrlInList);

exports._addUrlToList = function(url, callback) {
  exports._isUrlInList(url, (isInList) => {
    if (!isInList) {
      //open the file
      fs.open(exports.paths.list, 'w', (err,fd) => {
        if (err) {
          console.log('error opening file to add URL to list.');
        }
        //write the new url to the list
        fs.write(fd, url + '\n', (err) => {
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

exports._isUrlArchived = function(url, callback) {
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

exports.isUrlArchived = Promise.promisify(exports._isUrlArchived);

//trying to require jQuery breaks stuff!!
exports._downloadUrls = function(urls) {
  //Iterate over urls array
  urls.forEach( (val,ind,arr) => {
    var resStr = '';
    //for each URL, check if it is archived
    exports._isUrlArchived(val, (isArchived) => {
      if (!isArchived) {
        //if it is not, download the HTML of that page
        var options = {
          hostname: val,
          port: 80,
          method: 'GET',
          headers: httpHelpers.headers
        };

        var req = http.request(options, (res) => {
          res.setEncoding('utf8');

          res.on('data', (chunk) => {
            resStr += chunk;
          });

          res.on('end', () => {
            //make a new file in the archives directory
            fs.writeFile(exports.paths.archivedSites + '/' + val, resStr, (err) => {
              if (err) {
                throw err;
              }
              console.log('the archive file ' + val + ' has been written!');
            });
          });

        });

        req.on('error', (e) => {
          console.log('problem with downloading a URL: ', e.message);
        });

        req.end();

      } else {
        console.log('the url ' + val + 'is already archived.');
      }
    });
  });

};
