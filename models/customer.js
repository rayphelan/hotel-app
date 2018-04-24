var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var customerSchema = Schema({
  _id: Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  gender: String
});


// Name - Virtual for displaying full customer name
customerSchema
.virtual('name')
.get(function () {
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('customer', customerSchema);
