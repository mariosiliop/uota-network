'use strict';

// Initialize libraries

const co = require('co');
const fs = require('fs');
const http = require('http');
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const validator = require('validator');
const uuid = require('node-uuid');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const upload = multer({ dest : './assets/profile-photos'});

var dbconn;

module.exports = class App {

	constructor() {

		// Initialize DB connection
		mongodb.connect('mongodb://marios/uota', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

		var expressApp = express();

		var server = http.createServer(expressApp);

		var tops = require('../../routes/tops.js');
		var edit = require('../../routes/edit.js');
		var posts = require('../../routes/posts.js');
		var login = require('../../routes/login.js');
		var logout = require('../../routes/logout.js');
		var search = require('../../routes/search.js');
		var oauth = require('../../routes/linkedin.js');
		var comments = require('../../routes/comments.js');
		var register = require('../../routes/register.js');
		var verifyMail = require ('../../routes/verify-mail.js');
		var authenticate = require('../../routes/authentication.js');

		expressApp.use(bodyParser.urlencoded({ extended: true }));
		expressApp.use(cookieParser());
		expressApp.use((req,res,next) => {console.log(req.path);next();});

		// Handling no authenticated requests
		expressApp.get('/', this.handler);
		expressApp.get('/top10', [tops.top10]);
		expressApp.post('/login' , [login.handler]);
		expressApp.post('/logout', [authenticate.auth, logout.handler]);
		expressApp.post('/register', [register.handler]);

		expressApp.post('/search', [search.search_content]);
		expressApp.get('/verify-mail/:token', [verifyMail.handler]);

		// Handling Linkedin requests
		expressApp.get('/oauth/linkedin', [oauth.authorize]);
		expressApp.get('/auth/callback', [oauth.access_token]);

		// Handiling post requests
		expressApp.post('/posts/add', [authenticate.auth, posts.add]);
		expressApp.get('/posts/view', [authenticate.auth, posts.view]);
		expressApp.post('/post/comment' , [authenticate.auth, posts.comments]);
		expressApp.post('/post/comments', [authenticate.auth, posts.uniquePost]);

		// Handling comment requests
		expressApp.post('/comment/rate', [authenticate.auth, comments.rate]);
		expressApp.post('/comment/addview', [authenticate.auth, comments.addview]);
		expressApp.post('/comment/timeline', [authenticate.auth, comments.timeline]);
		expressApp.post('/comment/add', upload.single('pdf'), [authenticate.auth, comments.add]);
		expressApp.post('/comment/child', [authenticate.auth, comments.insert]);

		// Handling profile requests
		expressApp.post('/profile/details', [authenticate.auth, edit.profile]);
		expressApp.post('/edit-change', upload.single('photo'), [authenticate.auth, edit.handler]);



		expressApp.get('/:pages', (req, res) => {

	      console.log(req.params.pages + ' PAGES');

	      if(req.params.pages){
	            res.send(fs.readFileSync('./assets/'+req.params.pages+'.html').toString('utf8'));
	      }
	      else {
	         console.log('mpainw edw mesa');
	         res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
	      }

	   });

		expressApp.use(express.static('./assets'));

		server.listen(8082, '10.240.0.4');

	}

	handler(req, res) {
		res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
	}

};
