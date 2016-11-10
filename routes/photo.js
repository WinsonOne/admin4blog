var express = require('express');
var router = express.Router();
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './public/images')
    },
    filename: function (req, file, cb){
        cb(null, file.originalname)
    }
});
function fileFilter (req, file, cb) {

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  //cb(null, false)
  console.log(file.originalname);
  // To accept the file pass `true`, like so:
  //cb(null, true)
  cb(new Error(''));
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('imageFile');

/* GET photo page. */
router.get('/list', function(req, res, next) {
  res.render('listPhoto', {
    user : req.session.user,
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });
});

router.post('/save', function(req, res) {
  upload(req, res, function (err) {
    if (err) {
      // 发生错误
      req.flash('error', '文件已经存在!');
      res.redirect('/photo/list');
    }else{
      // 一切都好
      req.flash('success', '文件上传成功!');
      res.redirect('/photo/list');
    }
  });
});

module.exports = router;
