'use strict';

const co = require('co');

var logout = {

   handler: (req, res) => {

      co(function*(){

         console.log('Logout started..');

         var cookies = global.connection.collection('cookies');
         var logout_cookie = req.cookies.session_token;

         var delete_user = yield cookies.remove({cookie: logout_cookie});

         console.log('Logout finished..');

         res.end(delete_user);

      });

   }
};

module.exports = logout;
