var express = require('express');
var router = express.Router();
var Photo = require('../models').Photo;
var multer = require('multer');
var fs = require('fs');
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
  // To accept the file pass `true`, like so:
  //cb(null, true)
  var originalname = file.originalname;
  var author = req.session.user.username; // 作者
  Photo.findOne({'name':originalname}, function (err,photo) {
    if(photo){
      cb(new Error(''));
    }else{
      var p = new Photo({
        name : originalname,
        author : author,
        url : '/images/' + originalname 
      });
      p.save(function (err) {
        if(err){
          return handleError(err);
        }else{
          cb(null, true);
        }
      });
    }
  })
  
}

var upload = multer({
    storage: storage,
    fileFilter: fileFilter
}).single('imageFile');

/* GET photo page. */
router.get('/list', function(req, res, next) {
  Photo.find(function (err, docs) {
    res.render('listPhoto', {
      user : req.session.user,
      photos : docs,
      success : req.flash('success').toString(),
      error : req.flash('error').toString()
    });
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

router.get('/delete/:id', function(req, res, next) {
  Photo.findOne({'_id': req.params.id}, function (err,photo) {
    if(err){
      req.flash('error',err);
      res.redirect('/photo/list');
    }else{
      var path = __dirname;
      var lastIndex = path.lastIndexOf('/');
      path = path.substring(0,lastIndex);
      path = path +'/public' + photo.url;
      console.log('delete file:' + path);
      fs.unlink(path, function(err){
        if(err){
          console.error('err:' + err);
          req.flash('error',err);
          res.redirect('/photo/list');
        }else{
          Photo.remove({'_id': req.params.id}, function(err){
            if(err){
              req.flash('error', err);
              res.redirect('/photo/list');
            }else{
              req.flash('success', '成功删除图片!');
              res.redirect('/photo/list');
            }
          });
        }
      });
    }
  });
});

module.exports = router;
