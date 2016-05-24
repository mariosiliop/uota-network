'use strict';

const uuid = require('node-uuid');

var posts = {

   add: (req, res) => {

      if(req._cookie){

         var posts = global.connection.collection('posts');

         console.log(req.files);

         var title = req.body.title;
         var file = req.body.file;
         var author = req.body.author;
         var date = new Date(req.body.date || Date.now());
         var description = req.body.desc;
         var category = req.body.category;

          var description_words = req.body.desc.split(/\s+/).length;

         console.log(req.body.desc.split(/\s+/).length);

         if(title.length > 100 || description_words > 100) res.end('fail');
         else {

            posts.insert({
               pid: uuid.v1(),
               title: title,
               file: file,
               author: author,
               date: date,
               description: description,
               category: category
            });

            res.end('post added...');
         }

      }

      res.end('fail');

   }

};

module.exports = posts;
