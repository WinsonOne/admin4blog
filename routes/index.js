var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    error : req.flash('error').toString()
  });
});

module.exports = router;
