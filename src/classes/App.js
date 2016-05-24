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
		expressApp.get('/login' , [login.handler]);
		// Handling logout request
		expressApp.get('/logout', [logout.handler]);
		// Handling edit profile request
		expressApp.get('/edit-change', [edit.handler]);
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


		expressApp.use(express.static('./assets'));

		server.listen(8081, '10.240.0.4');

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
