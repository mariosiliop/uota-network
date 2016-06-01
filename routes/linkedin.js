'use strict';


const Linkedin = require('node-linkedin')('77o2f98ibc5od9', 'cnto3a04tunUT8Up');

var linkedin = {

   authorize: (req, res) => {
      console.log('geia');
      // set the callback url
      console.log(req.protocol + '://' + req.headers.host + '/auth/callback');
      Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/auth/callback');
      Linkedin.auth.authorize(res, ['r_basicprofile']);
   },

   access_token: (req, res) => {

      Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {

          if (err)console.error(err);

          console.log(results);

          var linkedin = Linkedin.init(results.access_token);

          linkedin.people.me(function(err, $in) {
             // Loads the profile of access token owner.
             console.log(err + ' error');
             console.log($in);

             res.end(JSON.stringify($in));
          });

      });
   }

};

module.exports = linkedin;
