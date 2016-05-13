'use strict';

const co = require('co');

var top10 = {

	top10: (req, res) => {
		co(function*(){

			console.log('Find top 10 users..');

			var profiles = global.connection.collection('profiles');
			var top10 = yield profiles.find().sort({ranking: -1}).limit(10).toArray();

			console.log('Find..');
			
			res.end(JSON.stringify(top10));

		});
	}

};

module.exports = top10;
