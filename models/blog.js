var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var blogSchema = new Schema({
  title:  String,
  author: String,
  content:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});

module.exports = mongoose.model('Blog', blogSchema);