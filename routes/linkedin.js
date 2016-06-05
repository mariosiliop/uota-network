'use strict';


const Linkedin = require('node-linkedin')('77o2f98ibc5od9', 'cnto3a04tunUT8Up');
const co = require('co');
var linkedin = {

   authorize: (req, res) => {
      console.log('geia');
      // set the callback url
      console.log(req.protocol + '://' + req.headers.host + '/auth/callback');
      Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/auth/callback');
      Linkedin.auth.authorize(res, ['r_basicprofile']);
   },

   access_token: (req, res) => {

      console.log(req.cookies.session_token + 'Change token..');

      var linkedin_data;

      Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {

          if (err)console.error(err);

          console.log(results);

          var linkedin = Linkedin.init(results.access_token);

          linkedin.people.me(function(err, $in) {
             // Loads the profile of access token owner.
             console.log($in);
             co(function*(){

                var cookies = global.connection.collection('cookies');

                var user = yield cookies.find({cookie: req.cookies.session_token}).toArray();

                var profiles = global.connection.collection('profiles');

                profiles.update(
                   {uid: user[0].uid},
                   {$set : {
                      first_name : $in.firstName,
                      last_name : $in.lastName,
                      nationality: $in.location.name,
                      pictures: $in.pictureUrl
                   }}
                );

             });

          });

      });

   }

};

module.exports = linkedin;
