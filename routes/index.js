var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Roomtype = require('../models/roomtype');
var Customer = require('../models/customer');
var Service = require('../models/service');
var Roomtype = require('../models/roomtype');

// Index page
router.get('/',(req, res, next)=>{
    res.render('index', { title: 'Hotel Manager' });
});

// Dashboard
router.get('/dashboard',(req,res,next)=>{
    res.render('dashboard',{ layout:false });
})

// Customers ---------------------------------------------------------
// Customers page
router.get('/customers',(req, res, next)=>{
    res.render('customers', { layout: false });
});
// Add Customer Partial Page
router.get('/customers/new', (req, res, next)=> {
    res.render('partials/customer-new', { layout:false });
});
// Edit Customer Partial Page
router.get('/customers/edit/:id', (req, res, next)=> {    
    Customer.findById(req.params.id, (err, customer)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/customer-edit',{ layout:false, customer:customer });
    })   
});


// Bookings ---------------------------------------------------------
// Bookings page
router.get('/bookings',(req, res, next)=>{
    res.render('bookings', { title: 'Hotel Management: Bookings' });
});


// Rooms ------------------------------------------------------------
// Rooms page
router.get('/rooms', (req, res, next) => {
    res.render('rooms',{ layout:false });
});
// Add Room Partial Page
router.get('/rooms/new', (req, res, next)=>{
    Roomtype.find({}, (err,roomtypes)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/room-new', { layout:false, roomtypes:roomtypes });
    });
});
// Edit Room Partial Page
router.get('/rooms/edit/:id', (req, res, next)=> {    
    Room.findById(req.params.id, (err, room)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        Roomtype.find({}, (err,roomtypes)=>{
            if(err) {
                res.status(500).json({errmsg:err});
            }
            res.render('partials/room-edit',{ layout:false, room:room, roomtypes:roomtypes });
        });        
    })   
});

// Services ----------------------------------------------------------
// Services page
router.get('/services', (req, res, next) => {
    res.render('services',{ layout:false });
});

// Add Services Partial Page
router.get('/services/new', (req, res, next)=> {
    res.render('partials/service-new', { layout:false });
});
// Edit Service Partial Page
router.get('/services/edit/:id', (req, res, next)=> {    
    Service.findById(req.params.id, (err, service)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/service-edit',{ layout:false, service:service });
    })   
});


// Room Types ----------------------------------------------------------
// Room Types page
router.get('/roomtypes', (req, res, next) => {
    res.render('roomtypes',{ layout:false });
});

// Add RoomType Partial Page
router.get('/roomtypes/new', (req, res, next)=> {
    res.render('partials/roomtype-new', { layout:false });
});
// Edit RoomType Partial Page
router.get('/roomtypes/edit/:id', (req, res, next)=> {    
    Roomtype.findById(req.params.id, (err, roomtype)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/roomtype-edit',{ layout:false, roomtype:roomtype });
    })   
});


// Export Router ----------------------------------------------------
module.exports = router;