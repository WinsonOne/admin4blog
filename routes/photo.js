var express = require('express');
var router = express.Router();

/* GET photo page. */
router.get('/list', function(req, res, next) {
  res.render('listPhoto', {
    success : req.flash('success').toString(),
    error : req.flash('error').toString()
  });
});

module.exports = router;
