(function () {
'use strict';

  var bodyParser = require('body-parser');

  module.exports = {
    port: 4000,
  //   express: function(app) {
  //     app.use(bodyParser.urlencoded({ extended: false }));
  //     app.use(bodyParser.json());
  //   }
    //add hostname
    //
    rosie: {
      hostname: 'localhost',
      port: 3000
    }
  }
})();