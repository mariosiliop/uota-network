'use strict';

const uuid = require('node-uuid');
const co = require('co');

var posts = {

   add: (req, res) => co(function*(){

      if(req._cookie){

         var posts = global.connection.collection('posts');

         var title = req.body.title;
         var description = req.body.description;

         var description_words = description.split(/\s+/).length;

         var step1, step2, step3, step4, step5, step6, step7, step8, step9, step10;

         if(req.body.title_1){
            step1 = {
               name: req.body.title_1,
               from: req.body.from_1,
               to: req.body.to_1
            };
         }

         if(req.body.title_2){
            step2 = {
               name: req.body.title_2,
               from: req.body.from_2,
               to: req.body.to_2
            };
         }

         if(req.body.title_3){
            step3 = {
               name: req.body.title_3,
               from: req.body.from_3,
               to: req.body.to_3
            };
         }

         if(req.body.title_4){
            step4 = {
               name: req.body.title_4,
               from: req.body.from_4,
               to: req.body.to_4
            };
         }

         if(req.body.title_5){
            step5 = {
               name: req.body.title_5,
               from: req.body.from_5,
               to: req.body.to_5
            };
         }

         if(req.body.title_6){
            step6 = {
               name: req.body.title_6,
               from: req.body.from_6,
               to: req.body.to_6
            };
         }

         if(req.body.title_7){
            step7 = {
               name: req.body.title_7,
               from: req.body.from_7,
               to: req.body.to_7
            };
         }

         if(req.body.title_8){
            step8 = {
               name: req.body.title_8,
               from: req.body.from_8,
               to: req.body.to_8
            };
         }

         if(req.body.title_9){
            step9 = {
               name: req.body.title_9,
               from: req.body.from_9,
               to: req.body.to_9
            };
         }

         if(req.body.title_10){
            step10 = {
               name: req.body.title_10,
               from: req.body.from_10,
               to: req.body.to_10
            };
         }

         if(title.length > 100 || description_words > 100) res.end('fail');
         else {

            var cookies = global.connection.collection('cookies');

            var user = yield cookies.find({cookie: req.cookies.session_token}).toArray();

            var users = global.connection.collection('users');

            var owner = yield users.find({uid: user[0].uid}).toArray();

            console.log(req.cookies.session_token);
            console.log(user);

            posts.insert({
               uid: user[0].uid,
               pid: uuid.v1(),
               username: owner[0].username,
               title: title,
               description: description,
               added: Date.now(),
               steps: {
                  step1: step1,
                  step2: step2,
                  step3: step3,
                  step4: step4,
                  step5: step5,
                  step6: step6,
                  step7: step7,
                  step8: step8,
                  step9: step9,
                  step10: step10,
               }
            });

            res.redirect('/home');
         }

      }

      res.end('fail');

   }),

   view:  (req, res) => co(function*(){

      var posts = global.connection.collection('posts');

      var view = yield posts.find().sort({added: -1}).toArray();

      res.send(view);
   }),

   uniquePost: (req, res) => co(function*(){

      console.log(req.body);

      var posts = global.connection.collection('posts');

      var view = yield posts.find({pid: req.body.pid}).toArray();

      res.send(view);
   }),

   comments:  (req, res) => co(function*(){

      var comments = global.connection.collection('comments');

      console.log('geiaaa');
      console.log(req.body.pid + ' PID');
      var comm = yield comments.find({pid: req.body.pid}).toArray();

      console.log(comm);
      res.send(comm);

   })

};

module.exports = posts;
