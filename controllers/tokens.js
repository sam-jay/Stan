// var config = require('../config');
// 	AWS = require('aws-sdk');
// 	// DynamoDBModel = require('dynamodb-model'),
// 	// Users = DyanamoDBModel.Model('User'),
// 	// Resources = DyanamoDBModel.Model('Resource'),
// 	// Groups = DyanamoDBModel.Model('Group');



// getTokens(function(req,res){
// 	if (req.headers['authorization'] !== undefined){
// 	  var header=req.headers['authorization']||'',        // get the header
// 	      token=header.split(/\s+/).pop()||'',            // and the encoded auth token
// 	      auth=new Buffer(token, 'base64').toString(),    // convert from base64
// 	      parts=auth.split(/:/),                          // split on colon
// 	      username=parts[0],
// 	      password=parts[1];
// 	  }

// 	  // #look up username and password to get LIST of groups
// 	  // look up groups to get SET of resources
// 	  // look up resources to get LIST of tokens


// 	  // eventually
// 	  // /*
// 	  // 	return res.json(200, {
// 			// tokens: token_list
// 	  // 	})
// 	  // */

//   res.writeHead(200,{'Content-Type':'text/plain'});
//   res.end('username is "'+username+'" and password is "'+password+'"');
// })