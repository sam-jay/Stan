var express = require('express'),
	DynamoDBModel = require('dynamodb-model'),
	AWS = require('aws-sdk'); 

// 
/*
var s3 = new AWS.S3(); 
 s3.createBucket({Bucket: 'myBucket'}, function() {
  var params = {Bucket: 'myBucket', Key: 'myKey', Body: 'Hello!'};
  s3.putObject(params, function(err, data) {
      if (err) 
        console.log(err)     
      else       
      	console.log("Successfully uploaded data to myBucket/myKey");   
   });
});
*/ 


var router = express.Router();

// tokens
router.get('/auth_service/tokens', controllers.tokens.getTokens)

// users
router.get('/auth_service/users/:id', controllers.users.getUser)
router.post('/auth_service/users', controllers.users.postUser)
router.put('/auth_service/users/:id', controllers.users.putUser)
router.delete('/auth_service/users/:id', controllers.users.deleteUser)

// groups
router.get('/auth_service/groups/:id', controllers.groups.getGroup)
router.post('/auth_service/groups', controllers.groups.postGroup)
router.put('/auth_service/groups/:id', controllers.groups.putGroup)
router.delete('/auth_service/groups/:id', controllers.groups.deleteGroup)

// resources
router.get('/auth_service/resources/:id', controllers.resources.getResource)
router.post('/auth_service/resources', controllers.resources.postResource)
router.put('/auth_service/resources/:id', controllers.resources.putResource)
router.delete('/auth_service/resources/:id', controllers.resources.deleteResource)

/*
Access Key ID:
AKIAIA7NTQBR73JI6VHQ
Secret Access Key:
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
/*