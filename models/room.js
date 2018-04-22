var mongoose = require('mongoose');

var roomSchema = mongoose.Schema({
  name: 
  {
    type:String
  },
  type: 
  {
    type:String
  },
  price: 
  {
    type:Number
  }
});

module.exports = mongoose.model('room', roomSchema);
