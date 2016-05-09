'use strict';

const co = require('co');

var top10 = {

	top10: (req, res) => {
		co(function*(){

			var profiles = global.connection.collection('profiles');
			var top10 = yield profiles.find().sort({ranking: -1}).limit(10).toArray();

			console.log(top10);
			res.end(JSON.stringify(top10));

		});
	}

};

module.exports = top10;
