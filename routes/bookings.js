var express = require('express');
var router = express.Router();
var Booking = require('../models/booking');
var Customer = require('../models/customer');
var Room = require('../models/room');
var Service = require('../models/service');
var mongoose = require('mongoose');


const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Booking Index page (all bookings)
router.get('/', (req, res, next)=>{
  Booking.find({})
  .populate('customer room service')
  .exec((err,bookings)=>{
    if(err) {
      console.log(err);
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
  body('adults').isLength({ min: 1 }).trim().withMessage('At least 1 adult is required. '),
  body('booking_date').isLength({ min: 1 }).trim().withMessage('Booking Date must be specified. '),
  body('checkin').isLength({ min: 1 }).trim().withMessage('Check-in Date must be specified. '),
  body('checkout').isLength({ min: 1 }).trim().withMessage('Check-out Date must be specified. '),

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

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
    service: req.body.service
  });    

  booking.save((err,booking)=> {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    Booking.find({})
    .populate('customer room service')
    .exec((err,bookings)=>{
      if(err) {
        console.log(err);
        res.status(500).json({error:err});
      }    
      res.render('partials/bookings',{layout:false, bookings:bookings });
    });
  });
});


// Update booking
router.put('/:id', [

  // Validate fields
  body('customer').isLength({ min: 1 }).trim().withMessage('Customer must be specified. '),
  body('room').isLength({ min: 1 }).trim().withMessage('Room must be specified. '),
  body('adults').isLength({ min: 1 }).trim().withMessage('At least 1 adult is required. '),
  body('booking_date').isLength({ min: 1 }).trim().withMessage('Booking Date must be specified. '),
  body('checkin').isLength({ min: 1 }).trim().withMessage('Check-in Date must be specified. '),
  body('checkout').isLength({ min: 1 }).trim().withMessage('Check-out Date must be specified. '),

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

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      else {
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
            service: req.body.service
          });          
          Booking.findByIdAndUpdate(req.params.id, booking, {}, function (err, booking) {
              if (err) {
                return res.status(401).json({ "error":err });
              }              
              Booking.find({})
              .populate('customer room service')
              .exec((err,bookings)=>{
                if(err) {
                  console.log(err);
                  res.status(500).json({error:err});
                }    
                res.render('partials/bookings',{layout:false, bookings:bookings });
              });             
          });
      }
  }
]);


//  Delete Bookings
router.delete('/:id', (req, res, next)=>{
  Booking.deleteOne({ "_id": req.params.id}, function(err) {
    if(err) {
      return res.status(401).json({ "error":err });
    }
    res.send(req.params.id);
  });
});

// Export Router
module.exports = router;