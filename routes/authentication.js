'use strict';

const co = require('co');

var authorize = {

   auth: (req, res, next) => co(function*(){

      console.log("Authentication started...");
      console.log(req.cookies.c_user);

      var cookies = global.connection.collection('cookies');
      var authenticated = yield cookies.find({cookie: '604e30e0-21f5-11e6-9a7c-b34471452e6e'}).toArray();

      if(authenticated[0]) req._cookie = true;
      else res.end('No authenticated user');

      console.log("Authentication completed...");

      next();
   })

};

module.exports = authorize;
