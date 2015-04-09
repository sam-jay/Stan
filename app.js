(function(){

var config = require('./config'),
  express = require('express'),
  AWS = require('aws-sdk'),
  error = require('./error.js'),
  fs = require('fs'),
  parser = require('body-parser');

var app = express();
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

app.listen(config.port);
console.log("Listening on port: " + config.port);


var dynamodb = new AWS.DynamoDB({
  region: 'us-west-2',
  accessKeyId: '***',
  secretAccessKey: '***'
});

var controllers = {};
fs.readdirSync('./controllers').forEach(function (file) {
  if (file.indexOf('.js') != -1) {
    controllers[file.split('.')[0]] = require('./controllers/' + file);
  }
});

// tokens
//router.get('/auth_service/tokens', controllers.tokens.getTokens);

// users
app.get('/auth_service/users/:id', controllers.users.getUser);
app.post('/auth_service/users', controllers.users.postUser);
app.put('/auth_service/users/:id', controllers.users.putUser);
app.delete('/auth_service/users/:id', controllers.users.deleteUser);

// groups

// app.get('/auth_service/groups/:id', controllers.groups.getGroup);
// app.post('/auth_service/groups', controllers.groups.postGroup);
// app.put('/auth_service/groups/:id', controllers.groups.putGroup);
// app.delete('/auth_service/groups/:id', controllers.groups.deleteGroup);

// resources

// app.get('/auth_service/resources/:id', controllers.resources.getResource);
// app.post('/auth_service/resources', controllers.resources.postResource);
// app.put('/auth_service/resources/:id', controllers.resources.putResource);
// app.delete('/auth_service/resources/:id', controllers.resources.deleteResource);


exports.dynamodb = dynamodb;

})();
