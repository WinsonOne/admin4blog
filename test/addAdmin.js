var User = require('../models').User;
var crypto =require('crypto');

var md5 = crypto.createHash('md5');
var username = 'admin';
var password = md5.update('123456').digest('hex');
var user = new User({
  username : username,
  password : password
});

user.save(function (err) {
  if (err) {
    return handleError(err);
  }else{
    console.log('success add admin user');
  }
})