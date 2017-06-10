var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};



// As you progress, keep thinking about what helper functions you can put here!

//helper functions for getting data
exports.sendResponse = function(res,obj,status) {
  if (!status) {
    status = 200;
  }
  response.writeHead(status, headers);
  response.end(obj);
};

//Not currently used- consider refactoring this way
exports.getData = function(req,cb) {
  var retStr = '';

  req.on('data', (chunk) => {
    retStr += chunk;
  });

  req.on('end', () => {
    cb(retStr);
  });

};
