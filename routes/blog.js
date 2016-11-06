var express = require('express');
var router = express.Router();
var Blog = require('../models').Blog;

/* GET write blog page. */
router.get('/writeBlog', function(req, res, next) {
  res.render('writeBlog', {
    user : req.session.user
  });
});

/** save blog */
router.post('/save', function(req, res, next) {
  var title = req.body.title; // 标题
  var author = req.session.user.username; // 作者
  var content = req.body.content; // 内容
  var blog = new Blog({
    title : title,
    author : author,
    content : content,
    hidden : false
  });
  blog.save(function (err) {
  if (err){
    return handleError(err);
  }else{
    // 保存成功
    return res.redirect('/blog/list');
  }
})
});

/* GET blog list page. */
router.get('/list', function(req, res, next) {
  var blogs = [];
  Blog.find(function (err, docs) {
    res.render('listBlog', {
      user : req.session.user,
      blogs : docs
    });
  });
});

module.exports = router;
