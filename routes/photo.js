var express = require('express');
var router = express.Router();

/* GET photo page. */
router.get('/list', function(req, res, next) {
  res.render('listPhoto', {
    user : req.session.user
  });
});

router.post('/save', upload.single('imageFile') , function(req, res) {
  req.flash('success', '文件上传成功!');
  res.redirect('/photo/list');
});

module.exports = router;
