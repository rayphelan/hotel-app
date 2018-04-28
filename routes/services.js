var express = require('express');
var router = express.Router();
var Service = require('../models/service');
var mongoose = require('mongoose');
const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');


// Service Index page (all services)
router.get('/', (req, res, next)=>{
  Service.find({}, (err, services)=>{
    if(err) {      console.log(err);
      res.status(500).json({error:err});
    }    
    res.render('partials/services',{layout:false, services:services });
  });
});


// POST new service
router.post('/', [

  // Validate fields
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified. '),
  body('price').isLength({ min: 1 }).trim().withMessage('Price must be specified. '),
  body('pricePer').isLength({ min: 1 }).trim().withMessage('Price Per must be specified. '),  

  // Sanitize fields.
  sanitizeBody('name').trim(),
  sanitizeBody('price').trim(),
  sanitizeBody('pricePer').trim(),

], (req, res, next) => {

  //  Validation Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  // Service Instance
  service = new Service({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    pricePer: req.body.pricePer
  });

  // Save Service
  service.save((err,service)=> {
    if(err) {
      res.status(500).json({error:err});
    }
    Service.find({}, (err, services)=>{
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors:err });
      }      
      res.render('partials/services',{layout:false, services:services });
    })
  });

});


// Update Service
router.put('/:id', [

  // Validate fields
  body('name').isLength({ min: 1 }).trim().withMessage('Name must be specified. '),
  body('price').isLength({ min: 1 }).trim().withMessage('Price must be specified. '),
  body('pricePer').isLength({ min: 1 }).trim().withMessage('Price Per must be specified. '),  

  // Sanitize fields.
  sanitizeBody('name').trim(),
  sanitizeBody('price').trim(),
  sanitizeBody('pricePer').trim(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Validation Errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.mapped() });
    }
    
    // Service Instance
    service = new Service({
      _id: req.params.id,
      name: req.body.name,
      price: req.body.price,
      pricePer: req.body.pricePer
    });

    // Update Service
    Service.findByIdAndUpdate(req.params.id, service, {}, function (err, service) {
        if (err) {
          return res.status(401).json({ "error":err });
        }              
        Service.find({}, (err, services)=>{
          if (err) {
            return res.status(500).json({ errors:err });
          }      
          res.render('partials/services',{layout:false, services:services });
        })              
    });
  }
]);


//  Delete Service
router.delete('/:id', (req, res, next)=>{
  Service.deleteOne({ "_id": req.params.id}, function(err) {
    if(err) {
      return res.status(401).json({ "error":err });
    }
    res.send(req.params.id);
  });
});

// Export Router
module.exports = router;