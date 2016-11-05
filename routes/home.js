var express = require('express');
var router = express.Router();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('home', {
    user : req.session.user,
    error : req.flash('error').toString()
  });
});

module.exports = router;
