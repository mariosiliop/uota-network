'use strict';

var posts = {

   add: (req, res) => {

      if(req._cookie){

         var posts = global.connection.collection('posts');
         var date = new Date(req.body.date || Date.now());

         console.log(date.getDate() + ' ' + (date.getMonth()+1) + ' ' + date.getFullYear());

         var r = req.body.description.split(/\s+/).length;

         console.log(r);

         // if(title.length > 100 || )

         posts.insert({
            title: req.body.title,
            file: req.body.file,
            author: req.body.authorm,
            date: req.body.date || date,
            description: req.body.description,
            category: req.body.category
         });

      }

      res.end('post added...');
   }

};

module.exports = posts;
