'use strict';

const co = require('co');

var logout = {

   handler: (req, res) => {

      co(function*(){

         console.log('Logout started..');

         var cookies = global.connection.collection('cookies');
         var logout_cookie = req.cookies.session_token;

         yield cookies.remove({cookie: logout_cookie});

         console.log('Logout finished..');

         res.clearCookie('session_token');
         res.redirect('/');

      });

   }
};

module.exports = logout;
