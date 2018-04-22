var express = require('express');
var router = express.Router();
var Room = require('../models/room');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Rooms Index page (all rooms)
router.get('/', (req, res, next)=>{
  Room.find({}, (err, rooms)=>{
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    //res.status(200).json(rooms);
    res.render('partials/rooms',{layout:false, rooms:rooms });
  });
});


// POST new room
router.post('/', [

  // Validate fields
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
  body('type').isLength({ min: 1 }).trim().withMessage('Type must be specified.'),
  body('price').isLength({ min: 1 }).trim().withMessage('Price must be specified.'),

  // Sanitize fields.
  sanitizeBody('name').trim(),
  sanitizeBody('type').trim(),
  sanitizeBody('price').trim(),

], (req, res, next) => {
  // Get the validation result whenever you want; see the Validation Result API for all options!
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  room = new Room({
    name: req.body.name,
    type: req.body.type,
    price: req.body.price
  });

  room.save((err,room)=> {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    Room.find({}, (err, rooms)=>{
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
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified.'),
  body('type').isLength({ min: 1 }).trim().withMessage('Type must be specified.'),
  body('price').isLength({ min: 1 }).trim().withMessage('Price must be specified.'),

  // Sanitize fields.
  sanitizeBody('name').trim(),
  sanitizeBody('type').trim(),
  sanitizeBody('price').trim(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      else {

          room = new Room({
            _id: req.params.id,
            name: req.body.name,
            type: req.body.type,
            price: req.body.price
          });
          Room.findByIdAndUpdate(req.params.id, room, {}, function (err, room) {
              if (err) {
                return res.status(401).json({ "error":err });
              }              
              Room.find({}, (err, rooms)=>{
                if (err) {
                  return res.status(500).json({ errors:err });
                }      
                res.render('partials/rooms',{layout:false, rooms:rooms });
              })              
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
    Room.find({}, (err, rooms)=>{
      if (err) {
        return res.status(500).json({"errors":err });
      }      
      //res.render('partials/rooms',{layout:false, rooms:rooms });
      res.send(req.params.id);
    })
  });
});

// Export Router
module.exports = router;