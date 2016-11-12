var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var photoSchema = new Schema({
  name:  String,
  author: String,
  url:   String,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Photo', photoSchema);