// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers');
var fs = require('fs');


exports.getHTMLfile = function (url, cb, isLocal) {
  if (isLocal) {
    fs.readFile(url, 'utf8', cb);
  }
};