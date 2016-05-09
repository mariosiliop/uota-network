'use strict';

const co = require('co');

var logout = {

   handler: (req, res) => {

      co(function*(){

         var cookies = global.connection.collection('cookies');
         var logout_cookie = req.cookies.session_token;

         console.log(logout_cookie + " token");

         var delete_item = yield cookies.remove({cookie: logout_cookie});

         res.end(delete_item);

      });

   }
};

module.exports = logout;
