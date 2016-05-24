'use strict';

const co = require('co');
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const validator = require('validator');
const fs = require('fs');

var register = {

	handler: (req, res)	=> co(function*(){

		console.log('Register started..');

       var users = global.connection.collection('users');
       var username = req.body.username;
       var exist_user = yield users.find({username: username}).toArray();

       if(exist_user[0] === undefined){

			 console.log('User doesnt exist..');

      	 var email = req.body.mail;

      	 if ( validator.isEmail(email) && req.body.password === req.body.password2 && req.body.password !== undefined ){

	       	 var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
	       	 var password = yield new Promise(resolve => bcrypt.hash(req.body.password, salt, (err, res) => resolve(res)));
	          var id = uuid.v1();

				 var token = uuid.v1();

      		 users.insert({

					 uid: id,
      			 username: String(username),
      			 password: password,
      			 mail: email,
      			 mailtoken: token,
      			 verified: false

      		 }, function(){

					 console.log('Send verification e-mail..');

      			 var nodemailer = require('nodemailer');

      			 var transporter = nodemailer.createTransport({
      				 service: 'Gmail',
      				 auth: {
      					 user: 'mariosiliop92@gmail.com',
      				    pass: 'M@rios19921992'
      				 }
      			 });

      			 var mailOptions = {
      				 from: '"Marios Iliopoulos" <mariosiliop92@gmail.com>', // sender address
      				 to: email, // list of receivers
      			    subject: 'UotA - network', // Subject line
      				 html: 'Verify your e-mail: http://marios.zenarena.com:8080/verify-mail/' + token  // html body
      			 };

      			 transporter.sendMail(mailOptions, function(error, info){
      				 if(error){return console.log(error);}
      				 console.log('Message sent: ' + info.response);
      			 });

					 console.log('Successfull registration..');

      			 res.end(fs.readFileSync('./assets/index.html').toString('utf8'));
      		 });

      	 }
      } else {
			console.log('User exist..');
      	res.send('User exist..');
      }

   }),

 };

 module.exports = register;
