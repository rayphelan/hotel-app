var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Roomtype = require('../models/roomtype');
var mongoose = require('mongoose');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Rooms Index page (all rooms)
router.get('/', (req, res, next)=>{
  Room.
  find({}).
  populate('roomtype').
  exec(function (err, rooms) {
    if (err) {
      console.log(err);
      res.status(500).json({error:err});
    }    
    res.render('partials/rooms',{layout:false, rooms:rooms });
  });
});


// POST new room
router.post('/', [

  // Validate fields
  body('name').isLength({ min: 1 }).trim().withMessage('Room Name must be specified. '),
  body('roomtype').isLength({ min: 1 }).trim().withMessage('Room Type must be specified. '),
  body('price').isLength({ min: 1 }).trim().withMessage('Price must be specified. '),
  body('pricePer').isLength({ min: 1 }).trim().withMessage('Price Per must be specified. '),

  // Sanitize fields.
  sanitizeBody('name').trim(),
  sanitizeBody('roomtype').trim(),
  sanitizeBody('price').trim(),
  sanitizeBody('pricePer').trim(),

], (req, res, next) => {
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  console.log(req.body);
  
  room = new Room({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    roomtype: req.body.roomtype,
    price: req.body.price,
    pricePer: req.body.pricePer
  });

  room.save((err,room)=> {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    Room.find({})
    .populate('roomtype')
    .exec((err, rooms)=>{
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors:err });
      }      
      res.render('partials/rooms',{layout:false, rooms:rooms });
    })
  });

});


// Update room
router.put('/:id', [

  // Validate fields
  body('name').isLength({ min: 1 }).trim().withMessage('Room Name must be specified. '),
  body('roomtype').isLength({ min: 1 }).trim().withMessage('Room Type must be specified. '),
  body('price').isLength({ min: 1 }).trim().withMessage('Price must be specified. '),
  body('pricePer').isLength({ min: 1 }).trim().withMessage('Price Per must be specified. '),

  // Sanitize fields.
  sanitizeBody('name').trim(),
  sanitizeBody('roomtype').trim(),
  sanitizeBody('price').trim(),
  sanitizeBody('pricePer').trim(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        console.log(errors.mapped());
        return res.status(400).json({ errors: errors.mapped() });
      }
      else {

          room = new Room({
            _id: req.params.id,
            name: req.body.name,
            roomtype: req.body.roomtype,
            price: req.body.price,
            pricePer: req.body.pricePer
          });
          Room.findByIdAndUpdate(req.params.id, room, {}, function (err, room) {
              if (err) {
                return res.status(500).json({ "error":err });
              }              
              Room.find({})
              .populate('roomtype')
              .exec((err, rooms)=>{
                if (err) {
                  return res.status(500).json({ errors:err });
                }      
                res.render('partials/rooms',{layout:false, rooms:rooms });
              });              
          });
      }
  }
]);


//  Delete Room
router.delete('/:id', (req, res, next)=>{
  Room.deleteOne({ "_id": req.params.id}, function(err) {
    if(err) {
      return res.status(401).json({ "error":err });
    }
    res.send(req.params.id);
  });
});

// Export Router
module.exports = router;