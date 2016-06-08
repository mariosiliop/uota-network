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

      if(match_users[0]) {

         console.log(match_users[0]);
         match_profiles = yield profiles.find({uid: match_users[0].uid}).toArray();
         console.log(match_profiles);
         res.send(match_profiles);

      }

      match_profiles = yield profiles.find({first_name: new RegExp(name, 'i')}).toArray();

      console.log(unique(match_profiles));

      if(match_profiles[0]) res.send(unique(match_profiles));

      var posts = global.connection.collection('posts');

      var match_posts = yield posts.find({title: new RegExp(name, 'i')}).toArray();

      if(match_posts[0]) res.send(unique(match_posts));

      res.send();

   })

};

module.exports = search;
