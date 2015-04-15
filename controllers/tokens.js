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
    if (req.headers['authorization'] !== undefined) {
      var header=req.headers['authorization']||'',        // get the header
          token=header.split(/\s+/).pop()||'',            // and the encoded auth token
          auth=new Buffer(token, 'base64').toString(),    // convert from base64
          parts=auth.split(/:/),                          // split on colon
          username=parts[0],
          password=parts[1];
    } else {
      return error.respond(401, res, 'Username and password must be specified in base64 encoding in the Authorization header of the request.')
    }
    req = {};
    req['params'] = {'id': username};
    var userInfo, userPW, userGroups;
    users.getUser(req, res, function(data) {
      userInfo = data;
      userPW = userInfo['Item']['password']['S'];
      userGroups = userInfo['Item']['group_list']['SS'];
      // invalid username / pw combo
      if (userPW !== password) {
        return error.respond(401, res, 'Invalid Password');
      } 
      // valid username/pw combo
      else {
        // to hold all resources
        var resources = [];
        // cycle through groups
        for (var i = 0; i < userGroups.length; i++) {
          console.log(userGroups[i]);
          req = {}
          req['params'] = {'id': userGroups[i]};
          // get corresponding resources
          groups.getGroup(req, res, function(data) {
            groupInfo = data;
            groupResources = groupInfo['Item']['resource_list']['SS'];
            // add all resources to list
            for (var j = 0; j < groupResources.length; j++) {
              resources.push(groupResources[j]);
            }
          });
        }
      }
    });

  };


})();
