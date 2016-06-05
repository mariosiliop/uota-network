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
		var search = require('../../routes/search.js');
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
		expressApp.get('/top10', [tops.top10]);
		expressApp.post('/login' , [login.handler]);
		expressApp.post('/logout', [logout.handler]);
		expressApp.post('/comment/add', upload.single('pdf'), [comments.add]);
		expressApp.post('/register', [register.handler]);
		expressApp.get('/oauth/linkedin', [oauth.authorize]);
		expressApp.get('/auth/callback', [oauth.access_token]);
		expressApp.get('/verify-mail/:token', [verifyMail.handler]);
		expressApp.post('/posts/add', [authenticate.auth, posts.add]);
		expressApp.post('/edit-change', upload.single('photo'), [authenticate.auth, edit.handler]);

		expressApp.post('/search', [search.search_content]);

		expressApp.post('/comment/addview', (req, res) => co(function*(){

			var comments = global.connection.collection('comments');

			yield comments.update(
				{cid: req.body.cid},
				{$inc: {
					views: 1
				}}
			);

			res.send();

		}));

		expressApp.post('/comment/timeline', (req, res) => co(function*(){

			var comments = global.connection.collection('comments');

			var view = yield comments.find({cid: req.body.cid}).toArray();

			res.send(view);
		}));

		expressApp.post('/comment/rate', (req, res) => co(function*(){

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
		}));


		expressApp.get('/posts/view', (req, res) => co(function*(){

			var posts = global.connection.collection('posts');

			var view = yield posts.find().toArray();

			res.send(view);
		}));

		expressApp.post('/post/comments', (req, res) => co(function*(){

			console.log(req.body);

			var posts = global.connection.collection('posts');

			var view = yield posts.find({pid: req.body.pid}).toArray();

			res.send(view);
		}));

		expressApp.post('/post/comment' , (req, res) => co(function*(){

			var comments = global.connection.collection('comments');

			var comm = yield comments.find({pid: req.body.pid}).toArray();

			console.log(comm);
			res.send(comm);

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
