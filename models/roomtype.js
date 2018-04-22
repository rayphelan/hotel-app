var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomtypeSchema = Schema({
  _id: Schema.Types.ObjectId,
  type: String,
  max_adults: Number,
  max_childs: Number,
  max_infants: Number
});

module.exports = mongoose.model('roomtype', roomtypeSchema);
