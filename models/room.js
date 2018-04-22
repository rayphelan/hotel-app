var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = Schema({
  _id: Schema.Types.ObjectId,
  name:String,
  roomtype:{ type: Schema.Types.ObjectId, ref: 'roomtype' },
  price:Number,
  pricePer:String
});

module.exports = mongoose.model('room', roomSchema);
