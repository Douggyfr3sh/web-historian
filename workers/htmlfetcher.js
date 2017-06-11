// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var helpers = require('../helpers/archive-helpers');
var fs = require('fs');

exports.startHelper = function () {
  setInterval(()=> {
    //get list of sites
    helpers.readListOfUrls((data) => {
      if (data.length === 0 || (data.length === 1 && data[0] === '')) {
        console.log('no Urls in list: ', data);
      } else {
        console.log('attempting to download the following URLS:', data);
        helpers.downloadUrls(data);
      }

    });
  }, 10000);
};


