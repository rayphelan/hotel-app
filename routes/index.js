var express = require('express');
var router = express.Router();
var Room = require('../models/room');

// Index page
router.get('/',(req, res, next)=>{
    res.render('index', { title: 'Hotel Manager' });
});

// Dashboard
router.get('/dashboard',(req,res,next)=>{
    res.render('dashboard',{ layout:false });
})

// Customers page
router.get('/customers',(req, res, next)=>{
    res.render('customers', { title: 'Hotel Management: Customers' });
});

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
router.get('/rooms/new', (req, res, next)=> {
    res.render('partials/room-new', { layout:false });
});

// Edit Room Partial Page
router.get('/rooms/edit/:id', (req, res, next)=> {    
    Room.findById(req.params.id, (err, room)=>{
        if(err) {
            res.status(500).json({errmsg:err});
        }
        res.render('partials/room-edit',{ layout:false, room:room });
    })   
});

// Services page
router.get('/services',(req, res, next)=>{
    res.render('services', { title: 'Hotel Management: Services' });
});


// Export Router
module.exports = router;