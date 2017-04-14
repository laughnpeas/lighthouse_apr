var bcrypt = require('bcrypt');
var users = require('./users');

/*
users.forEach(function(user) {
  bcrypt.hash(user.password, 10, function(err, hash) {
    console.log(`Was ${user.password} - Now ${hash}`);
  });
});
*/

['password', 'Password', 'password'].forEach(function(pw) {
  bcrypt.hash(pw, 10, function(err, hash) {
    console.log(`Was ${pw} - Now ${hash}`);
  });
});