'use strict';

const co = require('co');

var authorize = {

   auth: (req, res, next) => co(function*(){

      console.log("Authentication started...");

      var cookies = global.connection.collection('cookies');
      var authenticated = yield cookies.find({cookie: "bd7799a0-0a67-11e6-9074-b78ca3a705c9"}).toArray();

      if(authenticated[0]) req._cookie = true;
      else res.end('No authenticated user');

      console.log("Authentication completed...");

      next();
   })

};

module.exports = authorize;
