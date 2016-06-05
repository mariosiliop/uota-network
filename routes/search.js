'use strict';

const co = require('co');
const unique = require('array-unique');

var search = {

   search_content: (req, res) => co(function*(){

      var users = global.connection.collection('users');

      var name = String(req.body.username);
      var match_users = yield users.find({username: new RegExp(name, 'i')}).toArray();

      var profiles = global.connection.collection('profiles');
      var match_profiles = yield profiles.find({first_name: new RegExp('Emmanouhl', 'i')}).toArray();

      console.log(unique(match_profiles));


      res.send();
   })

};

module.exports = search;
