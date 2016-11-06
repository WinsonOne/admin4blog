var mongoose = require('mongoose');
var settings = require('../settings');

mongoose.connect(settings.mongodb, function (err) {
  if (err) {
    console.error('connect to %s error: ', settings.mongodb, err.message);
    process.exit(1);
  }
});

exports.User = require('./user');
exports.Blog = require('./blog');