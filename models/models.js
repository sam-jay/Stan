var DynamoDBModel = require('dynamodb-model'),
    ObjectId = DynamoDBModel.Schema.Types.ObjectId;
 

var userSchema = new DynamoDBModel.Schema({
  user: String,
  pw_hash: String,
  groups: [{ type: ObjectId, ref: 'Group' }]
});

var groupSchema = new DynamoDBModel.Schema({
  name: String,
  resources: [{ type: ObjectId, ref: 'Resource' }],
  users: [{ type: ObjectId, ref: 'User' }]
});

var resourceSchema = new DynamoDBModel.Schema({
  prefix: String,
  token: String
});

// create a model using the name of the DynamoDB table and a schema 
var Users = new DynamoDBModel.Model('User', userSchema);
var Groups = new DynamoDBModel.Model('Group', groupSchema);
var Resources = new DynamoDBModel.Model('Resource', resourceSchema);
