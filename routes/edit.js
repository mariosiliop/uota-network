'use strict';

const co = require('co');

var edit = {

	handler: (req, res) => {


		co(function*(){

			//var pic;
			var special = 'arts';
			//var pos = req.body.pos;
			var pos_cat = 'chief';
			//var org = req.body.org;
			var org_cat = 'multinational';
			//var gender = req.body.gender;
			var edu = 'ΤΕΙ';
			//var lan = req.body.lan;
			//var national = req.body.national;
			//var city = req.body.city;

			var spec_array = [
				'environment',
				'society',
				'administration',
				'arts',
				'science',
				'humanities',
				'agriculture',
				'livestock'
			];

			var pos_cat_array = [
				'administrative',
				'academic',
				'chief',
				'chairman',
				'self-employed',
				'unemployed'
			];

			var org_cat_array = [
				'public sector',
				'multinational',
				'middle-class business',
				'small or personal business',
				'M.K.O.',
			];

			var edu_array = [
				'ΤΕΙ',
				'ΑΕΙ',
				'MASTER',
				'PHD'
			];

			var correct_input;

			//special check
			for(let spec of spec_array)
			if(spec===special) correct_input=true;

			if(!correct_input)res.end('err 1');
			correct_input=false;

			//position category check
			for(let pos of pos_cat_array)
			if(pos===pos_cat) correct_input=true;

			if(!correct_input)res.end('err 2');
			correct_input=false;

			//organization catgory check
			for(let org of org_cat_array)
			if(org===org_cat) correct_input=true;

			if(!correct_input)res.end('err 3');
			correct_input=false;

			//education category check
			for(let education of edu_array)
			if(education===edu) correct_input=true;

			if(!correct_input)res.end('err 4');

			var cookies = global.connection.collection('cookies');
			var cookie = req.cookies.session_token;

			console.log(cookie);

			var auth = yield cookies.find({cookie: cookie}).toArray();

			console.log(auth);

			if(auth[0]){

				var profiles = global.connection.collection('profiles');
				var prof_exist = yield profiles.find({uid: auth[0].uid}).toArray();

				if(prof_exist[0]){

					profiles.update(

						{uid: prof_exist[0].uid},
						{$set:
							{

							}
						}

					);

				}
				else {

					profiles.insert({
						uid: auth[0].uid
					});

				}

			}

			res.end('ok');

		});


	}

};

module.exports = edit;
