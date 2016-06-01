'use strict';

const co = require('co');
// const multer = require('multer');

var edit = {

	handler: (req, res) => co(function*(){
		console.log(req.file);
		console.log(req.body);

		var arrays = require('../definitions/arrays.js');

		var profile_pic = (req.file) ? profile_pic = req.file.filename : 'edit_profile.png';
		var first_name = req.body.first_name;
		var last_name = req.body.last_name;
		var specialization;

		for(let x of arrays.spec_array)
			if(x == req.body.specialization)
				specialization  = req.body.specialization;

		if(specialization === undefined)
			res.send('Wrong values');

		var position = req.body.working;

		if(position === undefined)
			res.send('Wrong values');

		var pos_cat = [
			req.body.administrative,
			req.body.academic,
			req.body.director,
			req.body.unemployed,
			req.body.self
		];

		var i = 0;

		for(let x of pos_cat)
			if(x === undefined) i++;

		if(i < 2 || i > 4)
			res.send('wrong values');

		var correct;

		for(let x of pos_cat){

			if(x !== undefined) {
				correct = false;
				for(let y of arrays.pos_cat_array)

					if(x == y)
						correct = true;

			}

			if(!correct && x !== undefined)res.send('wrong values');

		}

		var sex = (req.body.sex == 'male' || 'female') ? sex = req.body.sex : res.send('wrong values');

		var edu = [
			req.body.aei,
			req.body.tei,
			req.body.master,
			req.body.phd
		];

		i = 0;

		for(let x of edu)
			if(x === undefined) i++;

		if(i < 1 || i > 3)
			res.send('wrong values');


		for(let x of edu){

			if(x !== undefined) {
				correct = false;
				for(let y of arrays.edu_array)

					if(x == y)
						correct = true;

			}

			if(!correct && x !== undefined)res.send('wrong values');

		}


		var lang1 = {
			name: '',
			understanding: '',
			writing: '',
			speaking: ''
		};

		var lang2 = {
			name: '',
			understanding: '',
			writing: '',
			speaking: ''
		};

		var lang3 = {
			name: '',
			understanding: '',
			writing: '',
			speaking: ''
		};
		console.log(lang1);
		console.log(lang2);
		console.log(lang3);


		if(req.body.lang1 !== undefined){
			lang1.name = req.body.lang1;
			lang1.writing = req.body.lang1_writ || '';
			lang1.speaking = req.body.lang1_sp || '';
			lang1.understanding = req.body.lang1_und || '';
		}
		if(req.body.lang2 !== undefined){
			lang2.name = req.body.lang2;
			lang2.writing = req.body.lang2_writ || '';
			lang2.speaking = req.body.lang2_sp || '';
			lang2.understanding = req.body.lang2_und || '';
		}
		if(req.body.lang3 !== undefined){
			lang3.name = req.body.lang3;
			lang3.writing = req.body.lang3_writ || '';
			lang3.speaking = req.body.lang3_sp || '';
			lang3.understanding = req.body.lang3_und || '';
		}

		if(req.body.nationality === undefined) res.send('wrong values');

		var nationality = req.body.nationality

		if(req.body.city === undefined) res.send('wrong values');

		var city = req.body.city;

		var org;

		if(req.body.organization !== undefined) org = req.body.organization;

		var profiles = global.connection.collection('profiles');

		var cookies = global.connection.collection('cookies');

		var user = yield cookies.find({cookie: 'd7813c30-267c-11e6-b78a-bd52a8d9585e'}).toArray();

		console.log(user[0]);
		if(user[0]){
			console.log('geiaaaaaa');
			profiles.insert({

				uid: user[0].uid,
				first_name: first_name,
				last_name: last_name,
				pictures: profile_pic,
				specialization: specialization,
				working: position,
				category: pos_cat,
				organization: org[0],
				org_cat: org[1],
				sex: sex,
				education: edu,
				lang1: lang1,
				lang2: lang2,
				lang3: lang3,
				nationality: nationality,
				city: city

			});
		}

		res.redirect('/home');
	})

};

module.exports = edit;
