'use strict';

const co = require('co');
const uuid = require('node-uuid');

var verifyMail = {

	handler: (req, res) => {

		console.log('Verification Mail..');

      var users = global.connection.collection('users');
		var cookie = global.connection.collection('cookies');
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

};

module.exports = verifyMail;
