(function () {
'use strict';

  var bodyParser = require('body-parser');

  module.exports = {
    port: 4000,
    var dynamodb = new AWS.DynamoDB({
      region: 'us-west-2',
      accessKeyId: '***',
      secretAccessKey: '***'
    });
    rosie: {
      hostname: 'localhost',
      port: 3001
    }
  }
})();
