(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
      app = require('../app.js'),
      error = require('../error.js'),
      users = require('./users.js'),
      groups = require('./groups.js'),
      resources = require('./resources.js');

  var getGroup = function(req, res, callback) {
    if (req.params.id !== undefined) {
      var params = {
        TableName: 'stan-groups',
        Key:{
          'group_id':{'S': req.params.id}
        }
      };
     app.dynamodb.getItem(params, function(err, data){
        if (err) {
          //on failure return 404
          return error.respond(404, res, '/auth_service/groups/' + req.params.id, err);
        } else {
          //on success return 200 with body
          if (Object.keys(data).length === 0) {
            return error.respond(404, res, '/auth_service/groups/' + req.params.id);
          }
          return callback(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/groups/' + req.params.id);
      
    }
  };

  var getUser = function(req, res, callback) {
    if (req.params.id !== undefined) {
      var params = {
        TableName: 'stan-users',
        Key:{
          'user_id':{'S': req.params.id}
        }
      };
      app.dynamodb.getItem(params, function(err, data){
        if (err) {
          //on failure return 404
          return error.respond(404, res, '/auth_service/users/' + req.params.id);
        } else {
          //on success return 200 with body
          if (Object.keys(data).length === 0) {
            return error.respond(404, res, '/auth_service/users/' + req.params.id);
          }
          return callback(data);
          //return res.json(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/users/' + req.params.id);
      
    }
  };

  var getResource = function(req, res, callback) {
    if (req.params.id !== undefined) {
      var params = {
        TableName: 'stan-resources',
        Key:{
          'resource_id':{'S': req.params.id}
        }
      };
     app.dynamodb.getItem(params, function(err, data){
        if (err) {
          //on failure return 404
          return error.respond(404, res, '/auth_service/resources/' + req.params.id, err);
        } else {
          //on success return 200 with body
          if (Object.keys(data).length === 0) {
            return error.respond(404, res, '/auth_service/resources/' + req.params.id);
          }
          return callback(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/resources/' + req.params.id);
      
    }
  };

  exports.getTokens = function(req, res) {
    if (req.headers['authorization'] !== undefined) {
      console.log(req.headers);
      var header=req.headers['authorization']||'',        // get the header
          token=header.split(/\s+/).pop()||'',            // and the encoded auth token
          type = header.split(/\s+/)[0];
          if (type.toLowerCase() !== 'basic') {
              return error.respond(401, res, 'Invalid Authorization - Require Basic Auth');
          }
          var auth=new Buffer(token, 'base64').toString(),    // convert from base64
          parts=auth.split(/:/),                          // split on colon
          username=parts[0],
          password=parts[1];
    } else {
      return error.respond(401, res, 'Username and password must be specified in base64 encoding in the Authorization header of the request.')
    }
    req = {};
    req['params'] = {'id': username};
    var userInfo, userPW, userGroups;
    getUser(req, res, function(data) {
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
        var tokens = [];
        var group_counter = 0;
        userGroups.forEach(function (group, index, groupArray) {
          var counter = 0;
          req['params'] = {'id': group};
          getGroup(req, res, function(data) {
            group_counter+=1;
            data['Item']['resource_list']['SS'].forEach(function (resource, index, array) {
              counter += 1;
              if (resources.indexOf(resource) === -1) {
                resources.push(resource);
              }
              if (counter === array.length) {
                counter = 0;
                resources.forEach(function (resource, index, arr) {
                  req['params'] = {'id': resource};
                  getResource(req, res, function(data) {
                    counter += 1;
                    var current_token = data['Item']['resource_token']['S'];
                    if (tokens.indexOf(current_token) === -1) {
                       tokens.push(current_token);
                    } 
                    console.log(group_counter);
                    if (counter === arr.length && group_counter === groupArray.length) {
                      console.log('inside');
                      res.status(200).json({"tokens": tokens});
                    } else {
                      console.log('else');
                    }
                  });
                });
              }
            });
          });
        });
      }
    });
  };


})();
