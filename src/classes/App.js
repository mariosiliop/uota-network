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

		expressApp.use(bodyParser.urlencoded({ extended: true }));
		expressApp.use(cookieParser());

		var server = http.createServer(expressApp);

		expressApp.get('/', this.handler);

		expressApp.get('/register', this.registerHandler);
		expressApp.get('/verify-mail/:token', this.verifyMailHandler.bind(this));
		expressApp.get('/login' , this.loginHandler.bind(this));
		expressApp.get('/edit', this.editHandler);
		expressApp.get('/logout', this.logoutHandler.bind(this));

		expressApp.use(express.static('./assets'));

		server.listen(8080, '10.240.0.4');

	}

	registerHandler(req, res) {

		 co(function*(){

			 var users = dbconn.collection('users');

			 var username = 'marios';

			 var exist_user = yield users.find({username: username}).toArray();

			 console.log(exist_user[0] + " users");

			 if(exist_user[0] === undefined){

			 				 var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
			 		   	 var password = yield new Promise(resolve => bcrypt.hash('marios', salt, (err, res) => resolve(res)));
							 var id = uuid.v1();

			 				 var email = 'mariosiliop92@gmail.com';

			 				 if ( validator.isEmail(email) ){
			 					 var token = uuid.v1();

			 					 users.insert({

									 uid: id,
			 						 username: username,
			 		   			 password: password,
			 		   			 mail: email,
			 						 mailtoken: token,
			 						 verified: false

			 					 }, function(){
			 						 var nodemailer = require('nodemailer');

			 						 var transporter = nodemailer.createTransport({
			 							 service: 'Gmail',
			 		   				 auth: {
			 								 user: 'mariosiliop92@gmail.com',
			 		   				    pass: 'M@rios19921992'
			 							 }
			 						 });

			 						 var mailOptions = {
			 							 from: '"Marios Iliopoulos" <mariosiliop92@gmail.com>', // sender address
			 		   				 to: email, // list of receivers
			 		   			    subject: 'UotA - network', // Subject line
			 		   				 html: 'Verify your e-mail: http://104.155.94.195:8080/verify-mail/' + token  // html body
			 						 };
			 						 console.log('http://104.155.94.195:8080/verify-mail/' + token);

			 						 transporter.sendMail(mailOptions, function(error, info){
			 							 if(error){return console.log(error);}
			 							 console.log('Message sent: ' + info.response);
			 						 });

			 						 res.end('ok');
			 					 });

			 				 }
			} else {
				 res.send('User exist..');
		 	}

		 });

 }

	verifyMailHandler(req, res) {


		var users = dbconn.collection('users');
		var cookie = dbconn.collection('cookies');
		var app = this;

		var token = req.params.token;
		var new_token = uuid.v1();

		users.update(
			{mailtoken: token},
			{$set: {verified: true}},
			function(err, updated) {
				if( err || !updated ) res.end("User not updated");
				else {
					co(function*(){

						var user = yield users.find({mailtoken: req.params.token}).toArray();

						cookie.insert({
							uid: user[0].uid,
							cookie: new_token
						});
						app.createCookie(res, new_token);
						res.end(new_token);

					});

				}

			});

	}

	loginHandler(req, res){

		var app =  this;

		co(function*(){

			var users = dbconn.collection('users');
			var cookies = dbconn.collection('cookies');
			var result = yield users.find({ username: 'marios' }).toArray();

			if(result[0] !== undefined){

				var correct_password =
					yield new Promise(resolve => bcrypt.compare('marios', result[0].password, (error, result) => resolve(result)));

				var new_token = uuid.v1();
				if(correct_password){

					app.createCookie(res, new_token);

					cookies.insert({
						username: result[0].uid,
						cookie: new_token
					});

				}

				res.send(new_token);

			}

			res.end('fail..');

		});


	}

	logoutHandler(req, res){

		co(function*(){

			var cookies = dbconn.collection('cookies');
			var logout_cookie = req.cookies.session_token;

			console.log(logout_cookie + " token");

		  	var delete_item = yield cookies.remove({cookie: logout_cookie});

			res.end(delete_item);

		});

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
