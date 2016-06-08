'use strict';

// const multer = require('multer');
// const upload = multer({dest:'./upload_files'});
const co = require('co');
const uuid = require('node-uuid');

var comments = {

   add: (req, res) => co(function*(){

      console.log(req.file);

      var comments = global.connection.collection('comments');

      var cookies = global.connection.collection('cookies');

      var user_cookie = yield cookies.find({cookie: req.cookies.session_token}).toArray();

      var users = global.connection.collection('users');

      var user = yield users.find({uid: user_cookie[0].uid}).toArray();

      var title = req.body.title;
      var file = req.file.filename;
      var author = (req.body.author)? author = req.body.author : author = user[0].username;
      var date = new Date(req.body.date || Date.now());
      var description = req.body.desc;
      var category = req.body.category;

      comments.insert({
         cid: uuid.v1(),
         pid: req.body.pid,
         title: title,
         file: file,
         author: author,
         date: date,
         description: description,
         category: category,
         type: req.file.mimetype,
         original: req.file.originalname,
         views: 0,
         score: 0
      });

      res.send();
   }),

   addview : (req, res) => co(function*(){

      var comments = global.connection.collection('comments');

      yield comments.update(
         {cid: req.body.cid},
         {$inc: {
            views: 1
         }}
      );

      res.send();

   }),

   timeline: (req, res) => co(function*(){

      var comments = global.connection.collection('comments');

      var view = yield comments.find({cid: req.body.cid}).toArray();

      res.send(view);
   }),

   rate:  (req, res) => co(function*(){

      var comments = global.connection.collection('comments');
      var grade = parseInt(req.body.rate1) + parseInt(req.body.rate2) + parseInt(req.body.rate3) + parseInt(req.body.rate4);

      console.log(req.body  + grade);
      yield comments.update(
         {cid: req.body.cid},
         {$inc: {
            score: grade
         }}
      );
      console.log('anteio');
      res.send();
   }),

   insert: (req, res)=>co(function*(){

      var com= global.connection.collection('timeline_comments');
      var cookie= global.connection.collection('cookies');
      var users= global.connection.collection('users');

      var user= yield cookie.find({cookie: req.cookies.session_token}).toArray();
      var username= yield users.find({uid: user[0].uid}).toArray();

      yield com.insert({
         cid: req.body.cid,
         comment: req.body.comment,
         user: username[0].username
      });

      res.send();
   }),

   all: (req, res) => co(function*(){

      var comments = global.connection.collection('timeline_comments');

      var answer = yield comments.find({cid: req.body.cid}).toArray();

      res.send(answer);
   })


};


module.exports = comments;
