var express = require('express');
var router = express.Router();

/* logout */
router.get('/', function(req, res, next) {
  req.session.user = null;
  req.flash('success', '成功登出');
  return res.redirect('/');
});

module.exports = router;
