var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var bookingSchema = Schema({
  _id: Schema.Types.ObjectId,
  customer: { type: Schema.Types.ObjectId, ref: 'customer' },
  room: { type: Schema.Types.ObjectId, ref: 'room' },
  adults: Number,
  childs: Number,
  infants: Number,
  booking_date: Date,
  checkin: Date,
  checkout: Date,
  price: Number,
  service: { type: Schema.Types.ObjectId, ref: 'service', default:null }
});


module.exports = mongoose.model('booking', bookingSchema);
