const bcrypt = require('bcrypt');

const saltRounds = 10; 

// This is how bcrypt has been used:
// bcrypt(userid + username + password()

// we don't know how the userId's are generated, so use UUIDv4
var userid = "b91fa9b4-69f1-4779-8d45-73f8653057f3"; 

// very long username
var username = "my.very.long.username.with.more.characters@kondukto.io" // 54 bytes long

// valid random password 
var password = "randomStrongPassword"
var validInput = userid + username + password;

// simulate bypass input -- can be anything
var password2 = "AAAAAAAAAAAAAAAAAAA"
var bypassInput = userid + username + password2;

bcrypt.genSalt(saltRounds, function(err, salt) {
	bcrypt.hash(validInput, salt, function(err, hash) {
		console.log(hash);
	});

	bcrypt.hash(bypassInput, salt, function(err, hash) {
		console.log(hash);
	});
});
