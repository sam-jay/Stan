var config = require('./config'),
	express = require('express'),
	AWS = require('aws-sdk'); 

/* Set Up DynamoDB */

AWS.config.update({
    accessKeyId: 'AKIAIA7NTQBR73JI6VHQ',
    secretAccessKey: '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',
    region: 'us-east-1'
});

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

var router = express.Router();

router.get('/auth_service/users/:id', controller. )
router.get('/auth_service/groups/:id', controller. )
router.get('/auth_service/resources/:id', controller. )
router.post('/auth_service/users', controller. )
router.post('/auth_service/groups', controller.)
router.post('/auth_service/resources', controller. )
router.put('/auth_service/users/:id', controller. )
router.put('/auth_service/groups/:id', controller. )
router.put('/auth_service/resources/:id', controller. )
router.delete('/auth_service/users/:id', controller. )
router.delete('/auth_service/groups/:id', controller. )
router.delete('/auth_service/resources/:id', controller. )