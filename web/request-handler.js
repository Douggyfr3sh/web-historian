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
  var getHTMLcb = function (err, data) {
    if (err) { res.statusCode = 404; }
    responseBody.body = data;
    res.write(JSON.stringify(responseBody));
    res.end();
  };

  //Test #1- return index.html on request url === '/'
  if (req.url === '/') { /* We want local index.html*/
    console.log(archive.paths.index);
    archive.getHTMLfile(archive.paths.index,getHTMLcb,true);

  } else { /* we are not requesting index.html */
    //Get HTML file if it is in the archive
    archive.getHTMLfile(archive.paths.archivedSites + req.url,getHTMLcb,true);
  }

};

var handlePost = function (req,res) {
  //create a cb func to pass to helpers
  var postCb = function (success) {
    if (success) {
      console.log('wrote new URL to list');
      res.statusCode = 302;
      //may need to add logic here to send data in response
    } else {
      console.log('problem writing URL to list');
      res.statusCode = 400;
    }
    res.end();
  };

  var requestBody = '';
  req.on('data', function (data) {
    //decode buffer
    var htmlChunk = data.toString('utf8');
    //get site from form input
    htmlChunk = htmlChunk.slice(htmlChunk.indexOf('=') + 1);
    console.log('POST data: ',htmlChunk);

    //append chunk to requestBody
    //may need to space or comma or /n delimit for processing
    requestBody += htmlChunk + "\n";
    console.log('requestBody in POST: ', requestBody);
  });

  req.on('end', function () {
    //add site to the list of sites
    archive.addUrlToList(requestBody, postCb);
  });

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
