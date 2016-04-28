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
		expressApp.get('/edit-change', this.editHandler);
		expressApp.get('/top10', this.top10Handler);
		expressApp.get('/logout', this.logoutHandler.bind(this));

		expressApp.use(express.static('./assets'));

		server.listen(8080, '10.240.0.4');

	}

	top10Handler(req, res){

		co(function*(){

			var profiles = dbconn.collection('profiles');
			var top10 = yield profiles.find().sort({ranking: -1}).limit(10).toArray();

			console.log(top10);
			res.end(JSON.stringify(top10));

		});

	}

	editHandler(req, res){


		co(function*(){

			//var pic;
			var special = 'arts';
			//var pos = req.body.pos;
			var pos_cat = 'chief';
			//var org = req.body.org;
			var org_cat = 'multinational';
			//var gender = req.body.gender;
			var edu = 'ΤΕΙ';
			//var lan = req.body.lan;
			//var national = req.body.national;
			//var city = req.body.city;

			var spec_array = [
				'environment',
				'society',
				'administration',
				'arts',
				'science',
				'humanities',
				'agriculture',
				'livestock'
			];

			var pos_cat_array = [
				'administrative',
				'academic',
				'chief',
				'chairman',
				'self-employed',
				'unemployed'
			];

			var org_cat_array = [
				'public sector',
				'multinational',
				'middle-class business',
				'small or personal business',
				'M.K.O.',
			];

			var edu_array = [
				'ΤΕΙ',
				'ΑΕΙ',
				'MASTER',
				'PHD'
			];

			var correct_input;

			//special check
			for(let spec of spec_array)
			if(spec===special) correct_input=true;

			if(!correct_input)res.end('err 1');
			correct_input=false;

			//position category check
			for(let pos of pos_cat_array)
			if(pos===pos_cat) correct_input=true;

			if(!correct_input)res.end('err 2');
			correct_input=false;

			//organization catgory check
			for(let org of org_cat_array)
			if(org===org_cat) correct_input=true;

			if(!correct_input)res.end('err 3');
			correct_input=false;

			//education category check
			for(let education of edu_array)
			if(education===edu) correct_input=true;

			if(!correct_input)res.end('err 4');

			var cookies = dbconn.collection('cookies');
			var cookie = req.cookies.session_token;

			console.log(cookie);

			var auth = yield cookies.find({cookie: cookie}).toArray();

			console.log(auth);

			if(auth[0]){

				var profiles = dbconn.collection('profiles');
				var prof_exist = yield profiles.find({uid: auth[0].uid}).toArray();

				if(prof_exist[0]){

					profiles.update(

						{uid: prof_exist[0].uid},
						{$set:
							{

							}
						}

					);

				}
				else {

					profiles.insert({
						uid: auth[0].uid
					});

				}

			}

			res.end('ok');

		});


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
			 						 username: String(username),
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
			var result = yield users.find({ username: req.body.username }).toArray();

			console.log(req.body.username);
			if(result[0] !== undefined){

				var correct_password =
					yield new Promise(resolve => bcrypt.compare(req.body.password, result[0].password, (error, result) => resolve(result)));

				var new_token = uuid.v1();
				if(correct_password){

					app.createCookie(res, new_token);

					cookies.insert({
						uid: result[0].uid,
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
