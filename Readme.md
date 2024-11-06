This repository demonstrates the bcrypt authentication bypass vulnerability disclosed by Okta on October 30, 2024.

Read the full blog post [here](https://kondukto.io/blog/okta-vulnerability-bcrypt-auth) for details.

When the first 72 bytes of two different inputs are identical, they produce the same hash.

This usage may cause an authentication bypass in the certain cases. 
```
bcrypt(userId + username + password)
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


