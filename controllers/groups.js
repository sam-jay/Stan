(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
  app = require('../app.js'),
  error = require('../error.js');

  // assume username is primary key
  exports.getGroup = function(req, res, callback) {
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
          res.json(200, data);
          return callback(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/groups/' + req.params.id);
      
    }
  };

  exports.postGroup = function(req, res) {
    var group_id, resource_list, user_list;
    try {
      group_id = req.body.group_id;
      resource_list = req.body.resource_list.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      user_list = req.body.user_list.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      //convert from string to array of strings
      // groups = req.body.groups.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      console.log(group_id);
      console.log(resource_list);
      console.log(user_list);

    } catch (err) { 
      console.log('parse error');
      console.log(err);
      return error.respond(400, res, 'Cannot parse input');
    }
    var params = {
      TableName: 'stan-groups',
      Item:{
        group_id: {'S': group_id},
        resource_list: {'SS': resource_list},
        user_list: {'SS': user_list}
      }
    };

    app.dynamodb.putItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(400, res, 'Cannot parse input');
      } else {
        res.status(201).json({
          group_id: group_id,
          resource_list: resource_list,
          user_list: user_list,
          url: '/auth_service/groups/' + group_id
        });
      }
    });
  };

  exports.putGroup = function(req, res, next) {
    // var group, email, password, groups;
    var updateExp = 'set ';
    var expAttributeVals = {};

    try {
      if (req.body.group_id) {
        updateExp = updateExp + 'group_id = :group_id,';
        expAttributeVals[':group_id'] = {
          'S': req.body.group_id
        };
      } 
      if (req.body.user_list) {
        updateExp = updateExp + 'user_list = :user_list,';
        expAttributeVals[':user_list'] = {
          'SS': req.body.user_list.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',')
        };
      } 
      if (req.body.resource_list) {
        updateExp = updateExp + 'resource_list = :resource_list';
        expAttributeVals[':resource_list'] = {
          'SS': req.body.resource_list.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',')
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
        'group_id':{'S': req.params.id}
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttributeVals
    }; 

    app.dynamodb.updateItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(404, res, '/auth_service/groups/' + req.params.id, err);
      } else {
        //if group_id has been changed 
        if (req.body.group_id) {
          params = {
            TableName: 'stan-groups',
            Key:{
              'group_id':{'S': req.body.group_id}
            }
          };
        } else {
          params = {
            TableName: 'stan-groups',
            Key:{
              'group_id':{'S': req.params.id}
            }
          };
        }
        
        app.dynamodb.getItem(params, function(err, data){
          if (err) {
            //on failure return 404
            return error.respond(404, res, '/auth_service/groups/' + req.params.id, err);
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
        'group_id':{'S': req.params.id}
      }
    };
    app.dynamodb.getItem(params, function(err, data){
      if (err) {
        return error.respond(404, res, '/auth_service/groups/' + req.params.id, err);
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