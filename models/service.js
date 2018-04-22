var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
  name: String,
  price: Number,
  pricePer: String
});

module.exports = mongoose.model('service', serviceSchema);
