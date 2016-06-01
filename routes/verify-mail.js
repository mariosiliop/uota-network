'use strict';

const co = require('co');
const uuid = require('node-uuid');
const fs = require('fs');

var verifyMail = {

	handler: (req, res) => {

		console.log('Verification Mail..');

      var users = global.connection.collection('users');
		var cookies = global.connection.collection('cookies');

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

						if(user[0]) {
							cookies.insert({
								uid: user[0].uid,
								cookie: new_token
							});
							res.cookie('session_token', new_token, {
								maxAge: 24 * 60 * 60 * 1000,
					         httpOnly: true
							});

							console.log('Mail verified..');
							res.redirect('/profile');
							//res.send(fs.readFileSync('./assets/profile.html').toString('utf8'));
						}
						else res.send('fail..');

					});

				}

			});

	}

};

module.exports = verifyMail;
