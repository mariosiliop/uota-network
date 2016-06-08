'use strict';

const co = require('co');
const unique = require('array-unique');

var search = {

   search_content: (req, res) => co(function*(){

      var users = global.connection.collection('users');

      console.log(req.body.search);

      var name = String(req.body.search);
      var match_users = yield users.find({username: new RegExp(name, 'i')}).toArray();

      var profiles = global.connection.collection('profiles');
      var match_profiles;
      var match_profile = [];

      if(match_users[0]) {

         for(let match of match_users){
            match_profiles = yield profiles.find({uid: match.uid}).toArray();

            match_profile.push(match_profiles[0]);
         }
         res.send(match_profile);

      }

      match_profiles = yield profiles.find({first_name: new RegExp(name, 'i')}).toArray();


      if(match_profiles[0]) res.send(match_profiles);

      var posts = global.connection.collection('posts');

      var match_posts = yield posts.find({title: new RegExp(name, 'i')}).toArray();

      if(match_posts[0]) res.send(match_posts);

      res.send();

   })

};

module.exports = search;
