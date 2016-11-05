var express = require('express');
var router = express.Router();
var User = require('../models').User;
var crypto = require('crypto');

/* post login */
router.post('/', function(req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  if(username == ''){
    req.flash('error', '用户名不能为空');
    return res.redirect('/');
  }
  if(password == ''){
    req.flash('error', '密码不能为空');
    return res.redirect('/');
  }
  // 校验用户名密码是否正确
  var md5 = crypto.createHash('md5');
  password = md5.update(password).digest('hex');
  User.findOne({'username': username,'password': password}, function (err, user) {
    if(err){
      return handleError(err);
    }else if(user){
      // 登录成功
      req.session.user = user;
      return res.redirect('/home');
    }else{
      req.flash('error', '用户名或密码错误');
      return res.redirect('/');
    }
  });
});

module.exports = router;
