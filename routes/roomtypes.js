var express = require('express');
var router = express.Router();
var Roomtype = require('../models/roomtype');
var mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Roomtypes Index page (all roomtypes)
router.get('/', (req, res, next)=>{
  Roomtype.find({}, (err, roomtypes)=>{
    if(err) {
      res.status(500).json({error:err});
    }    
    res.render('partials/roomtypes',{layout:false, roomtypes:roomtypes });
  });
});


// POST new room type
router.post('/', [

  // Validate fields
  body('type').isLength({ min: 1 }).trim().withMessage('Room Type must be specified. '),
  body('max_adults')
    .isLength({ min: 1 }).trim().withMessage('Max Adults must be specified. ')
    .isInt({ min: 1 }).trim().withMessage('At least 1 adult is required. '),
  body('max_childs')
    .isLength({ min: 1 }).trim().withMessage('Max Children must be specified. ')  
    .isInt({ min: 0 }).trim().withMessage('Max Children must be zero or more. '),  
  body('max_infants')
    .isLength({ min: 1 }).trim().withMessage('Max Infants must be specified. ') 
    .isInt({ min: 0 }).trim().withMessage('Max Infants must be zero or more. '),  

  // Sanitize fields.
  sanitizeBody('type').trim(),
  sanitizeBody('max_adults').trim(),
  sanitizeBody('max_childs').trim(),
  sanitizeBody('max_infants').trim(),

], (req, res, next) => {

  // Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  // Roomtype Instance
  roomtype = new Roomtype({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    max_adults: req.body.max_adults,
    max_childs: req.body.max_childs,
    max_infants: req.body.max_infants
  });

  // Save Roomtype
  roomtype.save((err,roomtype)=> {
    if(err) {
      res.status(500).json({error:err});
    }
    Roomtype.find({}, (err, roomtypes)=>{
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors:err });
      }      
      res.render('partials/roomtypes',{layout:false, roomtypes:roomtypes });
    })
  });

});


// Update Service
router.put('/:id', [

  // Validate fields
  body('type').isLength({ min: 1 }).trim().withMessage('Room Type must be specified. '),
  body('max_adults')
    .isLength({ min: 1 }).trim().withMessage('Max Adults must be specified. ')
    .isInt({ min: 1 }).trim().withMessage('At least 1 adult is required. '),
  body('max_childs')
    .isLength({ min: 1 }).trim().withMessage('Max Children must be specified. ')  
    .isInt({ min: 0 }).trim().withMessage('Max Children must be zero or more. '),  
  body('max_infants')
    .isLength({ min: 1 }).trim().withMessage('Max Infants must be specified. ') 
    .isInt({ min: 0 }).trim().withMessage('Max Infants must be zero or more. '),  

  // Sanitize fields.
  sanitizeBody('type').trim(),
  sanitizeBody('max_adults').trim(),
  sanitizeBody('max_childs').trim(),
  sanitizeBody('max_infants').trim(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }

    // Roomtype Instance
    roomtype = new Roomtype({
      _id: req.params.id,
      type: req.body.type,
      max_adults: req.body.max_adults,
      max_childs: req.body.max_childs,
      max_infants: req.body.max_infants
    });

    // Update Roomtype
    Roomtype.findByIdAndUpdate(req.params.id, roomtype, {}, function (err, roomtype) {
        if (err) {
          return res.status(401).json({ "error":err });
        }              
        Roomtype.find({}, (err, roomtypes)=>{
          if (err) {
            return res.status(500).json({ errors:err });
          }      
          res.render('partials/roomtypes',{layout:false, roomtypes:roomtypes });
        })              
    });

  }
]);


//  Delete Room Type
router.delete('/:id', (req, res, next)=>{
  Roomtype.deleteOne({ "_id": req.params.id}, function(err) {
    if(err) {
      return res.status(401).json({ "error":err });
    }
    res.send(req.params.id);
  });
});

// Export Router
module.exports = router;