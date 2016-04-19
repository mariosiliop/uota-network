'use strict';

const co = require('co');
const fs = require('fs');
const http = require('http');
const express = require('express');
const mongodb = require('mongodb');

module.exports = class App {

	constructor() {

		var expressApp = express();

		var server = http.createServer(expressApp);
		
		expressApp.get('/', this.handler);
		
		expressApp.get('/hi', this.hiHandler);
		expressApp.get('/sup', this.supHandler);
		
		expressApp.use(express.static('./assets'));
		
		server.listen(8080, '10.240.0.4');

	}
	
	hiHandler(req, res) {
		
		 co(function*(){
			 
			 var connection = yield mongodb.connect('mongodb://marios/uota');
			 var users = connection.collection('users');
			 
			 var result = yield users.find({id:1}).toArray();
			 
			 res.end(result[0].username);
			 
		 });
		
	}
	
	supHandler(req, res) {
		
		res.end('sup');
		
	}
	
	handler(req, res) {
		res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
	}

}