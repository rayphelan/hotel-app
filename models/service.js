var mongoose = require('mongoose');

var serviceSchema = mongoose.Schema({
  name: 
  {
    type:String
  },
  price: 
  {
    type:Number
  },
  type: 
  {
    type:String
  }
});

module.exports = mongoose.model('service', serviceSchema);
