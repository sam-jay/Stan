(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
      app = require('../app.js'),
      error = require('../error.js'),
      users = require('./users.js'),
      groups = require('./groups.js'),
      resources = require('./resources.js');

  exports.getTokens = function(req, res) {
    console.log(req.headers);
    if (req.headers['authorization'] !== undefined) {
      var header=req.headers['authorization']||'',        // get the header
          token=header.split(/\s+/).pop()||'',            // and the encoded auth token
          auth=new Buffer(token, 'base64').toString(),    // convert from base64
          parts=auth.split(/:/),                          // split on colon
          username=parts[0],
          password=parts[1];
    } else {
      console.log('fucked');
    }
    console.log(username);
    console.log(password);
    req = {};
    req['params'] = {'id': username};
    var results;
    users.getUser(req, res);
    console.log(results);
  };


})();