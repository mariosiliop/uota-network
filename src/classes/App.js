'use strict';

const co = require('co');
const fs = require('fs');
const http = require('http');
const express = require('express');
const mongodb = require('mongodb');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

module.exports = class App {

	constructor() {

		var expressApp = express();

		expressApp.use(bodyParser.urlencoded({ extended: true }));

		var server = http.createServer(expressApp);

		expressApp.get('/', this.handler);

		expressApp.get('/register', this.registerHandler);
		expressApp.get('/sup', this.supHandler);

		expressApp.use(express.static('./assets'));

		server.listen(8080, '10.240.0.4');

	}

	registerHandler(req, res) {

		 co(function*(){

			 var connection = yield mongodb.connect('mongodb://marios/uota');
			 var users = connection.collection('users');

			 var username = req.body.username;

			 var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
   		 var password = yield new Promise(resolve => bcrypt.hash(req.body.password, salt, (err, res) => resolve(res)));

			 var email = req.body.email;

			 users.insert({

				 username: username,
				 password: password,
				 mail: email

			 }, function(){

				 res.end('ok');				 

			 });

		 });

	}

	supHandler(req, res) {

		res.end('sup');

	}

	handler(req, res) {
		res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
	}

};
