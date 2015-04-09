(function () {
'use strict';

  var bodyParser = require('body-parser'),

  module.exports = {
    port: 3001,
    express: function(app) {
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());
    }
  }
})();