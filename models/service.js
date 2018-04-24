var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var serviceSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  price: Number,
  pricePer: String
});

module.exports = mongoose.model('service', serviceSchema);
