var express = require('express');
var router = express.Router();
var Room = require('../models/room');
var Roomtype = require('../models/roomtype');
var Customer = require('../models/customer');
var Service = require('../models/service');
var Roomtype = require('../models/roomtype');
var Booking = require('../models/booking');
var async = require('async');

// Index page (Same as dashboard)
router.get('/',(req, res, next)=>{
    res.render('index', { title: 'Hotel Manager' });
});

// Dashboard
router.get('/dashboard',(req,res,next)=>{
    res.render('dashboard',{ layout:false });
})


// Bookings ---------------------------------------------------------
// Bookings page
router.get('/bookings',(req, res, next)=>{
    res.render('bookings', { layout: false });
});
// New Booking Page
router.get('/bookings/new', (req, res, next)=>{

    async.parallel({
        customers: callback=>{
            Customer.find({}).exec(callback);            
        },
        rooms: callback=>{
            Room.find({}).populate('roomtype').exec(callback);
        },
        services: callback=>{
            Service.find({}).exec(callback);
        }
    }, (err, results) => {
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/booking-new', { layout: false , customers:results.customers, rooms:results.rooms, services:results.services });
    });
});
// Edit Booking Partial Page
router.get('/bookings/edit/:id', (req, res, next)=> {   
    
    async.parallel({
        booking: callback=>{
            Booking.findById(req.params.id).exec(callback);
        },
        customers: callback=>{
            Customer.find({}).exec(callback);            
        },
        rooms: callback=>{
            Room.find({}).populate('roomtype').exec(callback);
        },
        services: callback=>{
            Service.find({}).exec(callback);
        }
    }, (err, results)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/booking-edit',{ layout:false, booking:results.booking, customers:results.customers, rooms:results.rooms, services:results.services });
    });

    Booking.findById(req.params.id, (err, booking)=>{
        
    })   
});
// Delete Booking Partial Page
router.get('/bookings/delete/:id', (req, res, next)=> {
    res.render('partials/booking-delete', { layout:false, id:req.params.id });
});

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
// Delete Customer Partial Page
router.get('/customers/delete/:id', (req, res, next)=> {
    Booking.find({customer:req.params.id},(err,bookings)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/customer-delete', { layout:false, id:req.params.id, bookings:bookings });
    });
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
// Delete Room Partial Page
router.get('/rooms/delete/:id', (req, res, next)=> {
    Booking.find({room: req.params.id}, (err, bookings)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/room-delete', { layout:false, id:req.params.id, bookings:bookings });
    });
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
// Delete Service Partial page
router.get('/services/delete/:id', (req, res, next)=>{
    Booking.find({service: req.params.id}, (err, bookings)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/service-delete', { layout:false, id:req.params.id, bookings:bookings });
    });
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
// Delete RoomType Partial page
router.get('/roomtypes/delete/:id', (req, res, next)=>{
    // Check if RoomType is being referenced in Rooms
    Room.find({roomtype: req.params.id},(err, rooms)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        console.log(rooms);
        res.render('partials/roomtype-delete', { layout:false, id:req.params.id, rooms:rooms });
    });
});


// Export Router ----------------------------------------------------
module.exports = router;