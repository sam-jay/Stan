(function() {
  'use strict';

  /* Dependencies */
  var AWS = require('aws-sdk'),
      DynamoDBModel = require('dynamodb-model'),
      Users = DyanamoDBModel.Model('User'),
      Resources = DyanamoDBModel.Model('Resource'),
      Groups = DyanamoDBModel.Model('Group');

  exports.getUser = function(req, res, next) {

  };
  
  exports.postUser = function(req, res, next) {

  };

  exports.putUser = function(req, res, next) {

  };

  exports.deleteUser = function(req, res, next) {

  };




  router.get('/auth_service/users/:id', controllers.users.getUser);
  router.post('/auth_service/users', controllers.users.postUser);
  router.put('/auth_service/users/:id', controllers.users.putUser);
  router.delete('/auth_service/users/:id', controllers.users.deleteUser);

})();