var mongoose = require('mongoose');

var customerSchema = mongoose.Schema({
  firstName: 
  {
    type:String
  },
  lastName: 
  {
    type:String
  },
  email: 
  {
    type:String
  },
  phone:
  {
    type:String
  },
  gender:
  {
    type:String
  }
});

module.exports = mongoose.model('customer', customerSchema);
