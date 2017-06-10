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
  //console.log('this is req', req, 'this is res', res);
  //Test #1- return index.html on request url === '/'
  if (req.url === '/') {
    var localURL = '/Users/Doug/Documents/HR/Week04/hrr24-web-historian/web/public/index.html';
    console.log(localURL);

    //create a cb func to pass to our fetcher
    var cb = function (err, data) {
      if (err) { res.statusCode = 404; }
      console.log(data);
      responseBody.body = data;
      res.write(JSON.stringify(responseBody));
      res.end();
    };

    fetcher.getHTMLfile(localURL,cb,true);
  } else {
    //Test #2- return content of a website from
    //the archive if it exists there


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
