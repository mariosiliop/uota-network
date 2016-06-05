'use strict';

// const multer = require('multer');
// const upload = multer({dest:'./upload_files'});
const co = require('co');
const uuid = require('node-uuid');

var comments = {

   add: (req, res) => {

      console.log(req.file);

      var comments = global.connection.collection('comments');

      var title = req.body.title;
      var file = req.file.filename;
      var author = req.body.author;
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
   },
/*
   view: (req, res) => co(function*(){

      var comments = global.connection.collection('comments');

      var

      yield;
      res.send();
   })*/
};

module.exports = comments;
