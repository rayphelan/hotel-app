// Auto Load content -------------------------------
$(function() {
  switch(window.location.hash.substr(1)) {
    case 'dashboard':
      getDashboardFunction();
    break;
    case 'rooms':
      getRoomsFunction();
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

// Load Page functions ----------------------------
// Get Dashboard Function
const getDashboardFunction = () => {
  $('#page-wrapper').fadeOut(400, function() {
    $.get('/dashboard', html=>{
      $('#page-wrapper').html(html).fadeIn(300);
      $('.sidebar-btns').blur();
      $('#dashboard-btn').focus();
    })
  });
}

// Get Rooms Function
const getRoomsFunction = ()=>{
  $('#page-wrapper').fadeOut(400, function() {
    $.get('/rooms', html => {          
      $('#page-wrapper').html(html).fadeIn(300);      
      $('.sidebar-btns').blur();
      $('#rooms-btn').focus();
    })
  });    
}

// Get Customers Function
const getCustomersFunction = ()=>{
  $('#page-wrapper').fadeOut(400, function() {
    $.get('/customers', html=>{
      $('#page-wrapper').html(html).fadeIn(300);
      $('.sidebar-btns').blur();
      $('#customers-btn').focus();
    })
  });
}

// Get Bookings Function
const getBookingsFunction = ()=>{
  $('#page-wrapper').fadeOut(400, function() {
    $.get('/bookings', html=>{
      $('#page-wrapper').html(html).fadeIn(300);
      $('.sidebar-btns').blur();
      $('#bookings-btn').focus();
    })
  });
}

// Get Services Function
const getServicesFunction = ()=>{
  $('#page-wrapper').fadeOut(400, function() {
    $.get('/services', html=>{
      $('#page-wrapper').html(html).fadeIn(300);
      $('.sidebar-btns').blur();
      $('#services-btn').focus();
    })
  });
}

// Edit and Delete Functions -------------------------------------------
// Edit Room Function
const editRoomFunction = room_id => {
  $.get('/rooms/edit/' + room_id, html => {        
    $('#modalContent').html(html);
  });
}

// Delete Room Function
const deleteRoomFunction = room_id => {
  $.ajax({
    url: "/api/rooms/" + room_id,
    method: 'DELETE',      
    success: data=>{
      //$('#roomList').html(data);
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete room');
    }
  });      
}

// Edit Customer Function
const editCustomerFunction = customer_id => {
  $.get('/customers/edit/' + customer_id, html => {        
    $('#modalContent').html(html);
  });
}

// Delete Customer Function
const deleteCustomerFunction = customer_id => {
  $.ajax({
    url: "/api/customers/" + customer_id,
    method: 'DELETE',      
    success: data=>{        
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete customer');
    }
  });      
}

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

// Edit Service Function
const editServiceFunction = service_id => {
  $.get('/services/edit/' + service_id, html => {        
    $('#modalContent').html(html);
  });
}

// Delete Service Function
const deleteServiceFunction = service_id => {
  $.ajax({
    url: "/api/services/" + service_id,
    method: 'DELETE',      
    success: data=>{        
      $('#row'+data).fadeOut(1000);
    },
    error: ()=>{
      console.log('Can not delete service');
    }
  });      
}