'use strict';

const co = require('co');

var authorize = {

   auth: (req, res, next) => co(function*(){

      console.log("Authentication started...");
      console.log(req.cookies.session_token);

      var cookies = global.connection.collection('cookies');
      var authenticated = yield cookies.find({cookie: req.cookies.session_token}).toArray();

      if(authenticated[0]) req._cookie = true;
      else res.end('No authenticated user');

      console.log("Authentication completed...");

      next();
   })

};

module.exports = authorize;
