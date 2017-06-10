var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require ('fs');
var fetcher = require ('../workers/htmlfetcher');
// require more modules/folders here!

//research path module docs
//research url module docs
//get postman chrome extension


var handleGet = function (req,res) {
  res.statusCode = 200;
  var responseBody = {};

  //create a cb func to pass to our fetcher
  var cbLocal = function (err, data) {
    if (err) { res.statusCode = 404; }
    responseBody.body = data;
    res.write(JSON.stringify(responseBody));
    res.end();
  };

  //Test #1- return index.html on request url === '/'
  if (req.url === '/') { /* We want local index.html*/
    var localURL = '/Users/Doug/Documents/HR/Week04/hrr24-web-historian/web/public/index.html';
    fetcher.getHTMLfile(localURL,cbLocal,true);

  } else { /* we are not requesting index.html */
    //Get HTML file if it is in the archive
    fetcher.getHTMLfile(archive.paths.archivedSites + req.url,cbLocal,true);
  }

};

var handlePost = function (req,res) {

};

exports.handleRequest = function (req, res) {
  //handle request errors
  req.on('error', function(err) {
    console.error(err.stack);
  });

  //handle GET requests
  if (req.method === 'GET') {
    handleGet(req,res);
  } else if (req.method === 'POST') {
    //handle POST requests
    handlePost(req,res);
  }

  //res.end(archive.paths.list);
};
