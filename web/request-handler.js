var path = require('path');
var archive = require('../helpers/archive-helpers');
var fs = require('fs');
var fetcher = require('../workers/htmlfetcher');
var helpers = require('./http-helpers');
var url = require('url');
// require more modules/folders here!

//research path module docs -done
//research url module docs
//get postman chrome extension -done


var handleGet = function (req,res) {
  var getPath = url.parse(req.url).pathname;

  if (getPath === '/') {
    getPath = '/index.html';
  }

  helpers.serveAssets(res, getPath, ()=> {
    //remove leading /
    if (getPath[0] === '/') {
      getPath = getPath.slice(1);
    }

    //respond to request
    archive._isUrlInList(getPath, (isFound)=> {
      if (isFound) {
        //send redirect
        helpers.sendRedirect(res, '/loading.html');
      } else {
        //404 error
        helpers.notFound(res);
      }
    });
  });
};

var handlePost = function (req,res) {
  console.log('Post handler reached');

  helpers.getData(req, (data) => {
    var url = data.slice(data.indexOf('=') + 1);
    console.log('url in post', url);

    //is site in list?
    archive._isUrlInList(url, (isFound) => {
      if (archive.isUrlInList(url)) {
        //is site archived?


        if (archive.isUrlArchived(url)) {
          //redirect
          helpers.sendRedirect(res, '/' + url);
        } else {
          //redirect to loading page
          helpers.sendRedirect(res, '/loading.html');
        }

      } else {
        //site is not in list
        //add to list
        archive._addUrlToList(url, (err) => {
          //redirect to loading page
          helpers.sendRedirect(res, '/loading.html');
        });

      }
    });
  });
};

exports.handleRequest = function (req, res) {
  console.log('request received');
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
  } else {
    helpers.notFound(res);
  }
};
