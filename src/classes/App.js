'use strict';

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
		var oauth = require('../../routes/linkedin.js');
		var comments = require('../../routes/comments.js');
		var register = require('../../routes/register.js');
		var verifyMail = require ('../../routes/verify-mail.js');
		var authenticate = require('../../routes/authentication.js');

		expressApp.use(bodyParser.urlencoded({ extended: true }));
		expressApp.use(cookieParser());
		expressApp.use((req,res,next) => {console.log(req.path);next();});

		// Handling Default request
		expressApp.get('/', this.handler);
		// Handling Top 10 request
		expressApp.get('/top10', [tops.top10]);
		// Handling Login request
		expressApp.post('/login' , [login.handler]);
		// Handling logout request
		expressApp.post('/logout', [logout.handler]);
		// Handling edit profile request
		expressApp.post('/edit-change', upload.single('photo'), [authenticate.auth, edit.handler]);
		// Handling register request
		expressApp.post('/register', [register.handler]);
		// Handling verify mail
		expressApp.get('/verify-mail/:token', [verifyMail.handler]);
		// Handling add post
		expressApp.post('/posts/add', [authenticate.auth, posts.add]);
		// Handling comments
		expressApp.post('/comment/add', [comments.add]);
		// Handling linkedin connection
		expressApp.get('/oauth/linkedin', [oauth.authorize]);
		expressApp.get('/auth/callback', [oauth.access_token]);

		expressApp.get('/posts/view', (req, res) => co(function*(){

			var posts = global.connection.collection('posts');

			var view = yield posts.find().toArray();

			res.send(view);
		}));

		expressApp.post('/profile/details', (req, res) => co(function*(){

			var profiles = global.connection.collection('profiles');

			var profile = yield profiles.find({}).toArray();

			console.log(profile[4]);
			res.send(profile[4]);
		}));

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


	createCookie(res, token){

		res.cookie('session_token', token, {
			maxAge: 24 * 60 * 60 * 1000,
         httpOnly: true
		});

	}

	handler(req, res) {
		res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
	}

};
