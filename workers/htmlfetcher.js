// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var fs = require('fs');

//worker is scheduled to run every minute
//console.log statements work since node-scheduler is used
exports.archiveSites = function () {
  console.log('worker started: ', Date.now());
  archive.readListOfUrls(archive.downloadUrls);
};
