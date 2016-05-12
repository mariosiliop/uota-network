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
const Linkedin = require('node-linkedin')('77o2f98ibc5od9', 'cnto3a04tunUT8Up');

var dbconn;

module.exports = class App {

	constructor() {

		mongodb.connect('mongodb://marios/uota', function(err, dbc){

			 dbconn = global.connection = dbc;

		});

		var expressApp = express();

		var server = http.createServer(expressApp);

		var tops = require('../../routes/tops');
		var edit = require('../../routes/edit.js');
		var posts = require('../../routes/posts.js');
		var login = require('../../routes/login.js');
		var logout = require('../../routes/logout.js');
		var register = require('../../routes/register.js');
		var verifyMail = require ('../../routes/verify-mail.js');
		var authenticate = require('../../routes/authentication.js');

		expressApp.use(bodyParser.urlencoded({ extended: true }));
		expressApp.use(cookieParser());
		expressApp.use((req,res,next) => {console.log(req.path);next();});

		expressApp.get('/', this.handler);
		expressApp.get('/top10', [tops.top10]);
		expressApp.get('/login' , [login.handler]);
		expressApp.get('/logout', [logout.handler]);
		expressApp.get('/edit-change', [edit.handler]);
		expressApp.get('/register', [register.handler]);
		expressApp.get('/verify-mail/:token', [verifyMail.handler]);
		expressApp.post('/posts/add', [authenticate.auth, posts.add]);
		expressApp.get('/oauth/linkedin', function(req, res) {
		    // set the callback url
		    Linkedin.setCallback(req.protocol + '://' + req.headers.host + '/auth/callback');
		    Linkedin.auth.authorize(res, ['r_basicprofile']);
		});
		expressApp.get('/auth/callback', function(req, res) {

			 Linkedin.auth.getAccessToken(res, req.query.code, req.query.state, function(err, results) {

				  if (err)console.error(err);

				  console.log(results);

				  var linkedin = Linkedin.init(results.access_token);

				  linkedin.people.me(function(err, $in) {
				     // Loads the profile of access token owner.
				     console.log(err + ' error');
					  console.log($in);

				     res.end(JSON.stringify($in));
				  });

		    });

		 });

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
