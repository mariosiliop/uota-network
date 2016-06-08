'use strict';

const co = require('co');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');
const fs = require('fs');

var login = {

	handler: (req, res) => {

		co(function*(){

			console.log("Login started..");


			var users = global.connection.collection('users');
			var cookies = global.connection.collection('cookies');
			var result = yield users.find({ mail: req.body.email }).toArray();
			console.log(result);
			if(result[0] !== undefined && result[0].verified === true){

				console.log("User finded..");

				var correct_password =
					yield new Promise(resolve => bcrypt.compare(req.body.password, result[0].password, (error, result) => resolve(result)));

				if(correct_password){

					console.log('Successfull login..');

					var new_token = uuid.v1();

					console.log(new_token);
					res.cookie('session_token', new_token, {
						maxAge: 24 * 60 * 60 * 1000,
			         httpOnly: true
					});

					yield cookies.insert({
						uid: result[0].uid,
						cookie: new_token
					});

					res.redirect('/home');

				} else res.end('No valid data..');


			} else res.end('No valid data..');


		});


	}

};

module.exports = login;
