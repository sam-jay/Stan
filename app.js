(function(){

var config = require('./config');

var express = require('express'),
  AWS = require('aws-sdk'),
  router = express.Router(),
  parser = require('body-parser');

var app = express();
app.use(parser.json());

app.listen(config.port);
console.log("Listening on port: " + config.port);


var dynamodb = new AWS.DynamoDB({
        region: 'us-east-1',
        accessKeyId: '***',
        secretAccessKey: '***'
});


app.post('/auth_service/users', function(req, res){
	var params = {
		TableName: 'stan-users',
		Item:{
			user: {'S': req.body.user},
			email: {'S': req.body.email},
			password: {'S': req.body.pw},
			groups: {'S': req.body.groups}
		}
	};

	dynamodb.putItem(params, function(err, data){
		if (err) console.log(err, err.stack);
		else console.log("Success");
	});
		
});


app.get('/auth_service/users/:id',function(req, res){
	var params = {
		TableName: 'stan-users',
		Key:{
			'user':{'S': req.params.id}
		}
	};

	dynamodb.getItem(params, function(err, data){
		if (err) console.log(err, err.stack);
		else console.log(data)
	});
});

app.delete('/auth_service/users/:id',function(req,res){
	var params = {
		TableName: 'stan-users',
		Key:{
			'user':{'S': req.params.id}
		}
	};

	dynamodb.deleteItem(params, function(err,data){
		if(err) console.log(err, err.stack);
		else console.log(data)
	});
});

})()
