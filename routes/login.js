'use strict';

const co = require('co');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const fs = require('fs');

var login = {

	handler: (req, res) => {

		var app =  this;

		co(function*(){

			console.log("Login started..");

			console.log(req.body);

			var users = global.connection.collection('users');
			var cookies = global.connection.collection('cookies');
			var result = yield users.find({ mail: req.body.email }).toArray();
			console.log(result[0]);

			if(result[0] !== undefined && result[0].verified === false){

				console.log("User finded..");

				var correct_password =
					yield new Promise(resolve => bcrypt.compare(req.body.password, result[0].password, (error, result) => resolve(result)));

					console.log(correct_password);
				if(correct_password){

					console.log('Successfull login..');

					var new_token = uuid.v1();

					res.cookie('session_token', new_token, {
						maxAge: 24 * 60 * 60 * 1000,
			         httpOnly: true
					});

					console.log(new_token);

					yield cookies.insert({
						uid: result[0].uid,
						cookie: new_token
					});

					res.send(fs.readFileSync('./assets/home.html').toString('utf8'));

				} else res.end('fail..');


			} else res.end('fail..');


		});


	}

};

module.exports = login;
