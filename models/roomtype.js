var mongoose = require('mongoose');

var roomtypeSchema = mongoose.Schema({
  type: 
  {
    type:String
  },
  max_adults: 
  {
    type:Number
  },
  max_childs: 
  {
    type:Number
  },
  max_infants:
  {
    type:Number
  }
});

module.exports = mongoose.model('roomtype', roomtypeSchema);
