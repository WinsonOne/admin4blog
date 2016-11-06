var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });
});

module.exports = router;
