var express = require('express');
var router = express.Router();
var Customer = require('../models/customer');

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

// Customer Index page (all customers)
router.get('/', (req, res, next)=>{
  Customer.find({}, (err, customers)=>{
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }    
    res.render('partials/customers',{layout:false, customers:customers });
  });
});


// POST new customer
router.post('/', [

  // Validate fields
  body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
  body('lastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.'),
  body('email').isLength({ min: 1 }).trim().withMessage('Email must be specified.'),
  body('gender').isLength({ min: 1 }).trim().withMessage('Gender must be specified.'),

  // Sanitize fields.
  sanitizeBody('firstName').trim(),
  sanitizeBody('lastName').trim(),
  sanitizeBody('email').trim(),
  sanitizeBody('phone').trim(),
  sanitizeBody('gender').trim(),

], (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.mapped() });
  }

  customer = new Customer({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender
  });

  customer.save((err,customer)=> {
    if(err) {
      console.log(err);
      res.status(500).json({error:err});
    }
    Customer.find({}, (err, customers)=>{
      if (!errors.isEmpty()) {
        return res.status(500).json({ errors:err });
      }      
      res.render('partials/customers',{layout:false, customers:customers });
    })
  });

});


// Update customer
router.put('/:id', [

  // Validate fields
  body('firstName').isLength({ min: 1 }).trim().withMessage('First name must be specified.'),
  body('lastName').isLength({ min: 1 }).trim().withMessage('Last name must be specified.'),
  body('email').isLength({ min: 1 }).trim().withMessage('Email must be specified.'),
  body('gender').isLength({ min: 1 }).trim().withMessage('Gender must be specified.'),

  // Sanitize fields.
  sanitizeBody('firstName').trim(),
  sanitizeBody('lastName').trim(),
  sanitizeBody('email').trim(),
  sanitizeBody('phone').trim(),
  sanitizeBody('gender').trim(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
      else {

          customer = new Customer({
            _id: req.params.id,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            gender: req.body.gender
          });
          Customer.findByIdAndUpdate(req.params.id, customer, {}, function (err, customer) {
              if (err) {
                return res.status(401).json({ "error":err });
              }              
              Customer.find({}, (err, customers)=>{
                if (err) {
                  return res.status(500).json({ errors:err });
                }      
                res.render('partials/customers',{layout:false, customers:customers });
              })              
          });
      }
  }
]);


//  Delete Customer
router.delete('/:id', (req, res, next)=>{
  Customer.deleteOne({ "_id": req.params.id}, function(err) {
    if(err) {
      return res.status(401).json({ "error":err });
    }
    res.send(req.params.id);
  });
});

// Export Router
module.exports = router;