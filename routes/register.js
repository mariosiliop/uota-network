'use strict';

const co = require('co');
const uuid = require('node-uuid');
const bcrypt = require('bcrypt');
const validator = require('validator');

var register = {

	handler: (req, res)	=> co(function*(){

		console.log('Register started..');

       var users = global.connection.collection('users');
       var username = 'marios';
       var exist_user = yield users.find({username: username}).toArray();

       if(exist_user[0] === undefined){

			 console.log('User doesnt exist..');

      	 var salt = yield new Promise(resolve => bcrypt.genSalt(10, (err, res) => resolve(res)));
      	 var password = yield new Promise(resolve => bcrypt.hash('marios', salt, (err, res) => resolve(res)));
          var id = uuid.v1();

      	 var email = 'mariosiliop92@gmail.com';

      	 if ( validator.isEmail(email) ){

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
      				 html: 'Verify your e-mail: http://104.155.94.195:8080/verify-mail/' + token  // html body
      			 };

      			 transporter.sendMail(mailOptions, function(error, info){
      				 if(error){return console.log(error);}
      				 console.log('Message sent: ' + info.response);
      			 });

					 console.log('Successfull registration..');

      			 res.end('ok');
      		 });

      	 }
      } else {
			console.log('User exist..');
      	res.send('User exist..');
      }

   }),

 };

 module.exports = register;
