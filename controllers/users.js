(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
  app = require('../app.js'),
  error = require('../error.js');

  // assume username is primary key
  exports.getUser = function(req, res, callback) {
    if (req.params.id !== undefined) {
      var params = {
        TableName: 'stan-users',
        Key:{
          'user_id':{'S': req.params.id}
        }
      };
      console.log(params);
      app.dynamodb.getItem(params, function(err, data){
        if (err) {
          //on failure return 404
          return error.respond(404, res, '/auth_service/users/' + req.params.id);
        } else {
          //on success return 200 with body
          if (Object.keys(data).length === 0) {
            return error.respond(404, res, '/auth_service/users/' + req.params.id);
          }
          res.status(200).json(data);
          return callback(data);
          //return res.json(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/users/' + req.params.id);
      
    }
  };

  exports.postUser = function(req, res, next) {
    var user_id, email, password, group_list;
    try {
      user_id = req.body.user_id;
      email = req.body.email;
      password = req.body.pw;
      //convert from string to array of strings
      group_list = req.body.group_list.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
      console.log(user_id);
      console.log(email);
      console.log(group_list);

    } catch (err) { 
      console.log('parse error')
      console.log(err);
      return error.respond(400, res, 'Cannot parse input');
    }
    var params = {
      TableName: 'stan-users',
      Item:{
        user_id: {'S': user_id},
        email: {'S': email},
        password: {'S': password},
        group_list: {'SS': group_list}
      }
    };

    app.dynamodb.putItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(400, res, 'Cannot parse input');
      } else {
        res.status(201).json({
          user_id: user_id,
          email: email,
          group_list: group_list,
          url: '/auth_service/users/' + user_id
        });
      }
    });
  };

  exports.putUser = function(req, res, next) {
    // var user_id, email, password, group_list;
    var updateExp = 'set ';
    var expAttributeVals = {};

    try {
      if (req.body.user_id) {
        updateExp = updateExp + 'user_id = :username,';
        expAttributeVals[':username'] = {
          'S': req.body.user_id
        };
      } 
      if (req.body.email) {
        updateExp = updateExp + 'email = :email,';
        expAttributeVals[':email'] = {
          'S': req.body.email
        };
      } 
      if (req.body.pw) {
        updateExp = updateExp + 'pw = :pw,';
        expAttributeVals[':pw'] = {
          'S': req.body.pw
        };
      } 
      if (req.body.group_list) {
        group_list = req.body.group_list.split('[').join('').split(']').join('').split("\"").join('').split("\"").join('').split(',');
        updateExp = updateExp + 'group_list = :group_list';
        expAttributeVals[':group_list'] = {
          'SS': group_list
        };
      } 
      //remove trailing ,
      if (updateExp.charAt(updateExp.length - 1) === ',') {
        updateExp = updateExp.substring(0, updateExp.length - 1);
      }
    } catch (err) { 
      console.log('parse error')
      console.log(err);
      return error.respond(400, res, 'Cannot parse input');
    }

    var params = {
      TableName: 'stan-users',
      Key:{
        'user_id':{'S': req.params.id}
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttributeVals
    }; 

    app.dynamodb.updateItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(404, res, '/auth_service/users/' + req.params.id);
      } else {
        //on success return 200 with body
        params = {
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
            res.status(200).json(data);
          }
        });
        
      }
    });

  };

  exports.deleteUser = function(req, res, next) {
    var params = {
      TableName: 'stan-users',
      Key:{
        'user_id':{'S': req.params.id}
      }
    };
    app.dynamodb.getItem(params, function(err, data){
      if (err) {
        return error.respond(404, res, '/auth_service/users/' + req.params.id);
      } else {
        //on success return 200 with body
        if (Object.keys(data).length === 0) {
          return error.respond(404, res, '/auth_service/users/' + req.params.id);
        } else {
          app.dynamodb.deleteItem(params, function(response, result){
            res.status(204).send();
          });
        }
      }
    });
  };

})();
