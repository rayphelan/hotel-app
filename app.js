// Express Framework
var express = require('express');     

// Require Path
var path = require('path');

// Assign express to the variable "app"
var app = express();                        

// Middleware for parsing the entire body portion of an incoming request
var bodyParser = require('body-parser');    

// Middleware for MongoDB (NoSQL Database)
var mongoose = require('mongoose');

// Connect mongoose to MongoDB provided by mLab (Database as a service) DAAS
mongoose.connect('mongodb://jsonapi:sw0DHyayHmnKcPxf@ds139459.mlab.com:39459/hotelsdb');

// Tell the body-parser that we want to use JSON format
app.use(bodyParser.json());

// Tell the body-parse that we want URL Encoded data from the request
app.use(bodyParser.urlencoded({ extended:true }));  


//	Public Directory
app.use(express.static(__dirname+'/public'));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//	Routes
var indexRouter = require('./routes/index');
//var bookingsRouter = require('./routes/bookings');
//var customersRouter = require('./routes/customers');
var roomsRouter = require('./routes/rooms');
app.use('/', indexRouter);
//app.use('/api/bookings', bookingsRouter);
//app.use('/api/customers', customersRouter);
app.use('/api/rooms', roomsRouter);

// Start server
app.listen(3000, ()=>{
    console.log('Server running on port 3000');
})
