// Auto Load content -------------------------------
$(function() {
  switch(window.location.hash.substr(1)) {
    case 'dashboard':
      getDashboardFunction();
    break;
    case 'rooms':
      getRoomsFunction();
    break;
    case 'roomtypes':
      getRoomtypesFunction();
    break;
    case 'customers':
      getCustomersFunction();
    break;
    case 'bookings':
      getBookingsFunction();
    break;
    case 'services':
      getServicesFunction();
    break;
    default: getDashboardFunction();
  };   
})

const FADEOUT = 400;
const FADEIN = 400;

// Load Page functions ----------------------------
// Get Dashboard Function
const getDashboardFunction = () => {
  $('#page-wrapper').fadeOut(FADEOUT, function() {
    $.get('/dashboard', html=>{
      $('#page-wrapper').html(html).fadeIn(FADEIN);
      $('.sidebar-btns').blur();
      $('#dashboard-btn').focus();
    })
  });
}

// Get Rooms Function
const getRoomsFunction = ()=>{
  $('#page-wrapper').fadeOut(FADEOUT, function() {
    $.get('/rooms', html => {          
      $('#page-wrapper').html(html).fadeIn(FADEIN);      
      $('.sidebar-btns').blur();
      $('#rooms-btn').focus();
    })
  });    
}

// Get Customers Function
const getCustomersFunction = ()=>{
  $('#page-wrapper').fadeOut(FADEOUT, function() {
    $.get('/customers', html=>{
      $('#page-wrapper').html(html).fadeIn(FADEIN);
      $('.sidebar-btns').blur();
      $('#customers-btn').focus();
    })
  });
}

// Get Bookings Function
const getBookingsFunction = ()=>{
  $('#page-wrapper').fadeOut(FADEOUT, function() {
    $.get('/bookings', html=>{
      $('#page-wrapper').html(html).fadeIn(FADEIN);
      $('.sidebar-btns').blur();
      $('#bookings-btn').focus();
    })
  });
}

// Get Services Function
const getServicesFunction = ()=>{
  $('#page-wrapper').fadeOut(FADEOUT, function() {
    $.get('/services', html=>{
      $('#page-wrapper').html(html).fadeIn(FADEIN);
      $('.sidebar-btns').blur();
      $('#services-btn').focus();
    })
  });
}

// Get Roomtypes Function
const getRoomtypesFunction = ()=>{
  $('#page-wrapper').fadeOut(FADEOUT, function() {
    $.get('/roomtypes', html=>{
      $('#page-wrapper').html(html).fadeIn(FADEIN);
      $('.sidebar-btns').blur();
      $('#roomtypes-btn').focus();
    })
  });
}

// Rooms --------------------------------------------------------------
// Edit Room Function
const editRoomFunction = room_id => {
  $.get('/rooms/edit/' + room_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Room Function
const deleteRoomFunction = room_id => {
  $.get('/rooms/delete/' + room_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Room Request
const deleteRoomRequest = room_id => {
  $.ajax({
    url: "/api/rooms/" + room_id,
    method: 'DELETE',      
    success: data=>{
      $('#roomModal').modal('toggle');
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete room');
    }
  });      
}

// Customers --------------------------------------------------------------
// Edit Customer Function
const editCustomerFunction = customer_id => {
  $.get('/customers/edit/' + customer_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Customer Function
const deleteCustomerFunction = customer_id => {
  $.get('/customers/delete/' + customer_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Customer Request
const deleteCustomerRequest = customer_id => {
  $.ajax({
    url: "/api/customers/" + customer_id,
    method: 'DELETE',      
    success: data=>{    
      $('#customerModal').modal('toggle');    
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete customer');
    }
  });      
}

// Bookings --------------------------------------------------------------
// Edit Booking Function
const editBookingFunction = booking_id => {
  $.get('/bookings/edit/' + booking_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Booking Function
const deleteBookingFunction = booking_id => {
  $.ajax({
    url: "/api/bookings/" + booking_id,
    method: 'DELETE',      
    success: data=>{        
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete booking');
    }
  });      
}

// Services --------------------------------------------------------------
// Edit Service Function
const editServiceFunction = service_id => {
  $.get('/services/edit/' + service_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Service Function
const deleteServiceFunction = service_id => {  
  $.get('/services/delete/' + service_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete Service Request
const deleteServiceRequest = service_id => {
  $.ajax({
    url: "/api/services/" + service_id,
    method: 'DELETE',      
    success: data=>{     
      $('#serviceModal').modal('toggle');   
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete service');
    }
  });      
}

// RoomTypes --------------------------------------------------------------
// Edit RoomType Function
const editRoomtypeFunction = roomtype_id => {
  $.get('/roomtypes/edit/' + roomtype_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete RoomType Function
const deleteRoomtypeFunction = roomtype_id => {  
  $.get('/roomtypes/delete/' + roomtype_id, html => {        
    $('#modalContent').html(html);
  });
}
// Delete RoomType Request
const deleteRoomtypeRequest = roomtype_id => {
  $.ajax({
    url: "/api/roomtypes/" + roomtype_id,
    method: 'DELETE',      
    success: data=>{        
      $('#roomtypeModal').modal('toggle');
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete room type');
    }
  });      
}