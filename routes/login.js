'use strict';

const co = require('co');
const bcrypt = require('bcrypt');
const uuid = require('node-uuid');

var login = {

	handler: (req, res) => {

		var app =  this;

		co(function*(){

			var users = global.connection.collection('users');
			var cookies = global.connection.collection('cookies');
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

};

module.exports = login;
