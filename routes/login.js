'use strict';

const co = require('co');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');

var login = {

	handler: (req, res) => {

		var app =  this;

		co(function*(){

			console.log("Login started..");

			var users = global.connection.collection('users');
			var cookies = global.connection.collection('cookies');
			var result = yield users.find({ username: req.body.username }).toArray();

			if(result[0] !== undefined && result[0].verified === true){

				console.log("User finded..");

				var correct_password =
					yield new Promise(resolve => bcrypt.compare(req.body.password, result[0].password, (error, result) => resolve(result)));


				if(correct_password){

					console.log('Successfull login..');

					var new_token = uuid.v1();

					app.createCookie(res, new_token);

					cookies.insert({
						uid: result[0].uid,
						cookie: new_token
					});

					res.send(new_token);

				}


			}

			console.log('Login failed..');

			res.end('fail..');

		});


	}

};

module.exports = login;
