'use strict';

// const multer = require('multer');
// const upload = multer({dest:'./upload_files'});


var comments = {

   add: (req, res) => {

      var comments = global.connection.collection('comments');

      var title = req.body.title;
      var file = req.body.file;
      var author = req.body.author;
      var date = new Date(req.body.date || Date.now());
      var description = req.body.desc;
      var category = req.body.category;





      res.send();
   }

};

module.exports = comments;
