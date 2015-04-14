(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
      app = require('../app.js'),
      error = require('../error.js');

  // assume username is primary key
  exports.getResource = function(req, res) {
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
          res.status(200).json(data);
        }
      });
    } else {
      return error.respond(400, res, '/auth_service/resources/' + req.params.id);
      
    }
  };

  exports.postResource = function(req, res) {
    var resource_id, resource_token;
    try {
      resource_id = req.body.resource_id;
      resource_token = req.body.resource_token
      console.log(resource_id);
      console.log(resource_token);
    } catch (err) { 
      console.log('parse error');
      console.log(err);
      return error.respond(400, res, 'Cannot parse input');
    }
    var params = {
      TableName: 'stan-resources',
      Item:{
        resource_id: {'S': resource_id},
        resource_token: {'S': resource_token},
      }
    };

    app.dynamodb.putItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(400, res, 'Cannot parse input');
      } else {
        res.status(201).json({
          resource_id: resource_id,
          resource_token: resource_token,
          url: '/auth_service/resources/' + resource_id
        });
      }
    });
  };

  exports.putResource = function(req, res, next) {
    var updateExp = 'set ';
    var expAttributeVals = {};

    try {
      if (req.body.resource_id) {
        updateExp = updateExp + 'resource_id = :resource_id,';
        expAttributeVals[':resource_id'] = {
          'S': req.body.resource_id
        };
      } 
      if (req.body.resource_token) {
        updateExp = updateExp + 'resource_token = :resource_token,';
        expAttributeVals[':resource_token'] = {
          'S': req.body.resource_token
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
      TableName: 'stan-resources',
      Key:{
        'resource_id':{'S': req.params.id}
      },
      UpdateExpression: updateExp,
      ExpressionAttributeValues: expAttributeVals
    }; 

    app.dynamodb.updateItem(params, function(err, data){
      if (err) {
        console.log(err);
        return error.respond(404, res, '/auth_service/resources/' + req.params.id, err);
      } else {
        //if resource_id has been changed 
        if (req.body.resource_id) {
          params = {
            TableName: 'stan-resources',
            Key:{
              'resource_id':{'S': req.body.resource_id}
            }
          };
        } else {
          params = {
            TableName: 'stan-resources',
            Key:{
              'resource_id':{'S': req.params.id}
            }
          };
        }
        
        app.dynamodb.getItem(params, function(err, data){
          if (err) {
            //on failure return 404
            return error.respond(404, res, '/auth_service/resources/' + req.params.id, err);
          } else {
            //on success return 200 with body
            if (Object.keys(data).length === 0) {
              return error.respond(404, res, '/auth_service/resources/' + req.params.id);
            }
            res.status(200).json(data);
          }
        });
        
      }
    });

  };

  exports.deleteResource = function(req, res, next) {
    var params = {
      TableName: 'stan-resources',
      Key:{
        'resource_id':{'S': req.params.id}
      }
    };
    app.dynamodb.getItem(params, function(err, data){
      if (err) {
        return error.respond(404, res, '/auth_service/resources/' + req.params.id, err);
      } else {
        //on success return 200 with body
        if (Object.keys(data).length === 0) {
          return error.respond(404, res, '/auth_service/resources/' + req.params.id);
        } else {
          app.dynamodb.deleteItem(params, function(response, result){
            res.status(204).send();
          });
        }
      }
    });
  };

})();