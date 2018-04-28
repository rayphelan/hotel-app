var express = require('express');
var router = express.Router();
var Booking = require('../models/booking');
var Customer = require('../models/customer');
var Room = require('../models/room');
var RoomType = require('../models/roomtype');
var Service = require('../models/service');
var mongoose = require('mongoose');
var moment = require('moment');
var async = require('async');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Booking Index page (all bookings)
router.get('/', (req, res, next)=>{
  Booking.find({})
  .populate('customer room service')  // include full details from 'customer', 'room' and 'service'
  .exec((err,bookings)=>{
    if(err) {
      res.status(500).json({error:err});
    }    
    res.render('partials/bookings',{layout:false, bookings:bookings });
  });
});


// POST new booking
router.post('/', [

  // Validate fields
  body('customer').isLength({ min: 1 }).trim().withMessage('Customer must be specified. '),
  body('room').isLength({ min: 1 }).trim().withMessage('Room must be specified. '),
  body('adults')
    .isLength({ min: 1 }).trim().withMessage('The number of adults is required. ')
    .isInt({ min: 1 }).trim().withMessage('At least 1 adult is required. '),
  body('childs').isInt({ min:0 }).trim().withMessage('A value of zero or more is required for childs. '),
  body('infants').isInt({ min:0 }).trim().withMessage('A value of zero or more is required for infants. '),
  body('booking_date')
    .isLength({ min: 1 }).trim().withMessage('Booking Date must be specified. '),
  body('checkin')
    .isLength({ min: 1 }).trim().withMessage('Check-in Date must be specified. ')
    .isAfter(new Date().toString()).trim().withMessage('Check-in Date must be after today. '),
  body('checkout')
    .isLength({ min: 1 }).trim().withMessage('Check-out Date must be specified. ')
    .isAfter(new Date().toString()).trim().withMessage('Check-out Date must be after today. '),

  // Sanitize fields.
  sanitizeBody('customer').trim(),
  sanitizeBody('room').trim(),
  sanitizeBody('adults').trim(),
  sanitizeBody('childs').trim(),
  sanitizeBody('infants').trim(),
  sanitizeBody('booking_date').trim(),
  sanitizeBody('checkin').trim(),
  sanitizeBody('checkout').trim(),
  sanitizeBody('service').trim(),

], (req, res, next) => {
  
  // Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  // Async - Perform 'Room' and 'Service' functions in parallel
  async.parallel({
    // Room Data
    room: callback=>{
        Room.findById(req.body.room).exec(callback);
    },
    // Service Data
    service: callback=>{
        if(req.body.service) {
          Service.findById(req.body.service).exec(callback);            
        }
        else callback();
    }
  }, (err, results)=>{
    if(err) {
        res.status(500).json({errmsg:err});
    }

    // Variable to store calculated price
    var price = 0;
  
    // Pax - number of people in booking
    var pax = Number(req.body.adults) + Number(req.body.childs) + Number(req.body.infants);
    
    // If room price is "Per-person", paxFactor is the number of people in the room
    // If room price is "Per-room", paxFactor is 1
    var paxFactor = 0;  
  
    // Price Per person or room
    if(results.room.pricePer == 'Per-person') {
      paxFactor = pax;
    }
    else if(results.room.pricePer == 'Per-room') {
      paxFactor = 1;
    }

    // How many days
    var checkin = moment(req.body.checkin);
    var checkout = moment(req.body.checkout);
    var days = checkout.diff(checkin, 'days');
  
    // Room Price
    price = (results.room.price * days) * paxFactor;
  
    // Add Service Price
    if(results.service) {
      if(results.service.pricePer=='Per-person') {
        price += (results.service.price * pax);
      }
      else if(results.service.pricePer=='Per-room') {
        price += results.service.price;
      }
    }

    // Create new Booking instance
    booking = new Booking({
      _id: new mongoose.Types.ObjectId(),
      customer: req.body.customer,
      room: req.body.room,
      adults: req.body.adults,
      childs: req.body.childs? req.body.childs:0,
      infants: req.body.infants? req.body.infants:0,
      booking_date: req.body.booking_date,
      checkin: req.body.checkin,
      checkout: req.body.checkout,
      price: price,
      service: (req.body.service? req.body.service: null)
    });

    // Save Booking
    booking.save((err,booking)=> {
      if(err) {        
        res.status(500).json({error:err});
      }
      Booking.find({})
      .populate('customer room service')  // include full details from 'customer', 'room' and 'service'
      .exec((err,bookings)=>{
        if(err) {
          res.status(500).json({error:err});
        }    
        res.render('partials/bookings',{layout:false, bookings:bookings });
      });
    });
  }); // async end
});


// Update booking
router.put('/:id', [

  // Validate fields
  body('customer').isLength({ min: 1 }).trim().withMessage('Customer must be specified. '),
  body('room').isLength({ min: 1 }).trim().withMessage('Room must be specified. '),
  body('adults')
    .isLength({ min: 1 }).trim().withMessage('The number of adults is required. ')
    .isInt({ min: 1 }).trim().withMessage('At least 1 adult is required. '),
  body('childs').isInt({ min:0 }).trim().withMessage('A value of zero or more is required for childs. '),
  body('infants').isInt({ min:0 }).trim().withMessage('A value of zero or more is required for infants. '),
  body('booking_date')
    .isLength({ min: 1 }).trim().withMessage('Booking Date must be specified. '),
  body('checkin')
    .isLength({ min: 1 }).trim().withMessage('Check-in Date must be specified. ')
    .isAfter(new Date().toString()).trim().withMessage('Check-in Date must be after today. '),
  body('checkout')
    .isLength({ min: 1 }).trim().withMessage('Check-out Date must be specified. ')
    .isAfter(new Date().toString()).trim().withMessage('Check-out Date must be after today. '),

    
  // Sanitize fields.
  sanitizeBody('customer').trim(),
  sanitizeBody('room').trim(),
  sanitizeBody('adults').trim(),
  sanitizeBody('childs').trim(),
  sanitizeBody('infants').trim(),
  sanitizeBody('booking_date').trim(),
  sanitizeBody('checkin').trim(),
  sanitizeBody('checkout').trim(),
  sanitizeBody('service').trim(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    
    // Async
    async.parallel({
      // Room Data
      room: callback=>{
          Room.findById(req.body.room).exec(callback);
      },
      // Service Data
      service: callback=>{
          if(req.body.service) {
            Service.findById(req.body.service).exec(callback);            
          }
          else callback();
      }
    }, (err, results)=>{
      
      // Variable to store calculated price
      var price = 0;

      // Pax - number of people in booking
      var pax = Number(req.body.adults) + Number(req.body.childs) + Number(req.body.infants);

      // If room price is "Per-person", paxFactor is the number of people in the room
      // If room price is "Per-room", paxFactor is 1
      var paxFactor = 0;  
    
      // Price Per person or room
      if(results.room.pricePer == 'Per-person') {
        paxFactor = pax;
      }
      else if(results.room.pricePer == 'Per-room') {
        paxFactor = 1;
      }
      
      // How many days
      var checkin = moment(req.body.checkin);
      var checkout = moment(req.body.checkout);
      var days = checkout.diff(checkin, 'days');
    
      // Room Price
      price = (results.room.price * days) * paxFactor;
    
      // Add Service Price
      if(results.service) {
        if(results.service.pricePer=='Per-person') {
          price += (results.service.price * pax);
        }
        else if(results.service.pricePer=='Per-room') {
          price += results.service.price;
        }
      }
    
      // Booking Instance
      booking = new Booking({
        _id: req.params.id,
        customer: req.body.customer,
        room: req.body.room,
        adults: req.body.adults,
        childs: req.body.childs,
        infants: req.body.infants,
        booking_date: req.body.booking_date,
        checkin: req.body.checkin,
        checkout: req.body.checkout,
        service: (req.body.service? req.body.service: null),
        price: price
      });   
      
      Booking.findByIdAndUpdate(req.params.id, booking, {}, function (err, booking) {
        if (err) {
          return res.status(401).json({ "error":err });
        }              
        Booking.find({})
        .populate('customer room service')
        .exec((err,bookings)=>{
          if(err) {
            res.status(500).json({error:err});
          }    
          res.render('partials/bookings',{layout:false, bookings:bookings });
        });             
      });
    });
  }
]);


//  Delete Bookings
router.delete('/:id', (req, res, next)=>{
  Booking.deleteOne({ "_id": req.params.id}, function(err) {
    if(err) {
      return res.status(401).json({ "error":err });
    }
    res.send(req.params.id); // Respond with deleted id
  });
});

// Export Router
module.exports = router;