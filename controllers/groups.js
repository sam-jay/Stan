(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
  app = require('../app.js'),
  error = require('../error.js');

  // assume username is primary key
  exports.getGroup = function(req, res) {
    if (req.params.id !== undefined) {
      var params = {
        TableName: 'stan-groups',
        Key:{
          'name':{'S': req.params.id}
        }
      };
     app.dynamodb.getItem(params, function(err, data){
        if (err) {
          //on failure return 404
          return error.respond(404, res, '/auth_service/groups/' + req.params.id);
        } else {
          //on success return 200 with body
          if (Object.keys(data).length === 0) {
            return error.respond(404, res, '/auth_service/groups/' + req.params.id);
          }
          res.status(200).json(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/groups/' + req.params.id);
      
    }
  };

  exports.postGroup = function(req, res) {
    var name, resources, users;
    try {
      name = req.body.name;
      resources = req.body.resources.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      users = req.body.users.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      //convert from string to array of strings
      // groups = req.body.groups.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      console.log(group);
      console.log(email);
      console.log(groups);

    } catch (err) { 
      console.log('parse error');
      console.log(err);
      return error.respond(400, res, 'Cannot parse input');
    }
    var params = {
      TableName: 'stan-groups',
      Item:{
        name: {'S': name},
        resources: {'SS': resources},
        users: {'SS': users}
      }
    };

    app.dynamodb.putItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(400, res, 'Cannot parse input');
      } else {
        res.status(201).json({
          name: name,
          resources: resources,
          users: users,
          url: '/auth_service/groups/' + name
        });
      }
    });
  };

  exports.putGroup = function(req, res, next) {
    // var group, email, password, groups;
    var updateExp = 'set ';
    var expAttributeVals = {};

    try {
      if (req.body.name) {
        updateExp = updateExp + 'name = :name,';
        expAttributeVals[':name'] = {
          'S': req.body.name
        };
      } 
      if (req.body.users) {
        updateExp = updateExp + 'users = :users,';
        expAttributeVals[':users'] = {
          'SS': req.body.users.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',')
        };
      } 
      if (req.body.groups) {
        groups = req.body.groups.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',')
        updateExp = updateExp + 'groups = :groups';
        expAttributeVals[':groups'] = {
          'SS': groups
        };
      } 
      //remove trailing ,
      if (updateExp.charAt(updateExp.length - 1) === ',') {
        updateExp = updateExp.substring(0, updateExp.length - 1);
      }
    } catch (err) { 
      console.log('parse error');
      console.log(err);
      return error.respond(400, res, 'Cannot parse input');
    }

    var params = {
      TableName: 'stan-groups',
      Key:{
        'name':{'S': req.params.id}
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttributeVals
    }; 

    app.dynamodb.updateItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(404, res, '/auth_service/groups/' + req.params.id);
      } else {
        //if name has been changed 
        if (req.body.name) {
          params = {
            TableName: 'stan-groups',
            Key:{
              'name':{'S': req.body.name}
            }
          };
        } else {
          params = {
            TableName: 'stan-groups',
            Key:{
              'name':{'S': req.params.id}
            }
          };
        }
        
        app.dynamodb.getItem(params, function(err, data){
          if (err) {
            //on failure return 404
            return error.respond(404, res, '/auth_service/groups/' + req.params.id);
          } else {
            //on success return 200 with body

            if (Object.keys(data).length === 0) {
              return error.respond(404, res, '/auth_service/groups/' + req.params.id);
            }
            res.status(200).json(data);
          }
        });
        
      }
    });

  };

  exports.deleteGroup = function(req, res, next) {
    var params = {
      TableName: 'stan-groups',
      Key:{
        'name':{'S': req.params.id}
      }
    };
    app.dynamodb.getItem(params, function(err, data){
      if (err) {
        return error.respond(404, res, '/auth_service/groups/' + req.params.id);
      } else {
        //on success return 200 with body
        if (Object.keys(data).length === 0) {
          return error.respond(404, res, '/auth_service/groups/' + req.params.id);
        } else {
          app.dynamodb.deleteItem(params, function(response, result){
            res.status(204).send();
          });
        }
      }
    });
  };

})();