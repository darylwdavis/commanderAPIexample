# apiPointAndHistoryExample
Provides a framework for developing your interface to KMC Controls Commander Bx
KMC Commander Cloud – Getting Started


This document introduces the available REST API for accessing your data in the cloud.
Introduction

Documentation

Tags
All entities in the cloud database are tagged with Haystack tags.  If you go back to that first ‘doc’ URL, over on the lower left is a list of Extensions.  Each extension is a set of functions and tags.  There is a lot there, and some is not turned on.  
Standard tags compiled by the Haystack community are at http://project-haystack.org and there is other documentation there.


// Query the Database

// Write to the Database

// logging in
$.ajax({
    type: 'GET',
    url: '/api/demo',
    headers: {          
      Accept: 'text/plain',         
      "Content-Type": "text/plain; charset=utf-8"
    }
  }).done(function(data, statusText, xhr){
    if(data.substring(0,3) != 'ver'){
      // we're not logged in
      $('#loginModal').modal('show');
    }else{
      //$('#cloudModal').modal('show');
    }
  });
  $('#loginModal').on('hidden.bs.modal', function(){
    location.reload();
  });
  $('#cloudModal').on('hidden.bs.modal', function(){
    if(!Connected)
      location.reload();
  });

  $('#cloud-modal-connect').click(function(){
    var host = $('#cloud-host-input').val();
    // login to cloud server
    $.ajax({
      type: 'GET',
      url: 'http://'+host+'/auth/demo/api?'+'su',
      headers: {          
        Accept: 'text/plain',         
        "Content-Type": "text/plain; charset=utf-8"
      },
      success: function(data){
        var rows = data.split('\n');
        var userSalt = rows[1].split(':')[1];
        var nonce = rows[3].split(':')[1];
        var shaObj = new jsSHA('SHA-1', "TEXT");
        shaObj.setHMACKey('su', "TEXT");
        shaObj.update('su'+':'+userSalt);
        var hmac = shaObj.getHMAC("B64");
        var shaObj2 = new jsSHA('SHA-1', 'TEXT');
        shaObj2.update(hmac+':'+nonce);
        var hash = shaObj2.getHash('B64');
        var data = 'nonce:'+nonce+'\n'+'digest:'+hash;
        $.ajax({
          type: 'POST',
          url: 'http://'+host+'/auth/demo/api?'+'su',
          headers: {          
            Accept: 'text/plain',         
            "Content-Type": "text/plain; charset=utf-8"
          },
          data: data
        }).fail(function(){
          $('#cloud-host-basicStatus').text('Invalid username or password for cloud server');
        }).done(function(data, statusText, xhr){
          CookieCloud = data.substring(data.indexOf(':')+1);
          Connected = true;
          $('#cloudModal').modal('hide');
        });
      }
    });
  });

  $('#cloud-modal-login').click(function(){
    // get the userSalt and nonce from /auth/demo/api?username
    $('#cloud-host-basicStatus').text('');
    $.ajax({
      type: 'GET',
      url: '/auth/demo/api?'+$('#cloud-host-username').val(),
      headers: {          
        Accept: 'text/plain',         
        "Content-Type": "text/plain; charset=utf-8"
      },
      success: function(data){
        var rows = data.split('\n');
        var userSalt = rows[1].split(':')[1];
        var nonce = rows[3].split(':')[1];
        var shaObj = new jsSHA('SHA-1', "TEXT");
        shaObj.setHMACKey($('#cloud-host-password').val(), "TEXT");
        shaObj.update($('#cloud-host-username').val()+':'+userSalt);
        var hmac = shaObj.getHMAC("B64");
        var shaObj2 = new jsSHA('SHA-1', 'TEXT');
        shaObj2.update(hmac+':'+nonce);
        var hash = shaObj2.getHash('B64');
        var data = 'nonce:'+nonce+'\n'+'digest:'+hash;
        $.ajax({
          type: 'POST',
          url: '/auth/demo/api?'+$('#cloud-host-username').val(),
          headers: {          
            Accept: 'text/plain',         
            "Content-Type": "text/plain; charset=utf-8"
          },
          data: data
        }).fail(function(){
          $('#cloud-host-basicStatus').text('Invalid username or password');
        }).done(function(data, statusText, xhr){
          Cookie = data.substring(data.indexOf(':')+1);
          location.reload();
        });
      }
    });
  });
  
Getting Data
A Device is tagged as a 'device', so searching through the database for all entities with that tag will get you the list of devices
dicovered on the network.  

We can filter the search by looking for a particular name using find() and search on the ‘dis’ tag:
  
//Examples

•	Get device list

•	Find particular device(s) that match criteria, such as those marked as VAVs or are meters

Read all vav
		Returns a list of all devices with a vav tag.

Read all meters
		Returns a list of devices with a meter tag.
		Query for unit
			Returns a list of points with kWh unit of measure.

Read all Schedules
	Returns a list of points that can be scheduled.

Read all Alarms


Read all equipment named “RTU1”.

•	Find all points that are energy points on a device

•	Find all points that are energy points in the systems

•	Get history of energy values

Return today’s energy history from the ElecMeter device. 

You can replace “today” with a specific date.
	[Returns the history from October 1.]

Or use a date range:
	(2015-10-01..2015-10-08)
Returns the history from October 1 through October 8

•	Read the present value of a BACnet point

Reads the present value of property AV40 on a device named “Room 103”


•	Set the present value of a BACnet point

Writes a value of 77 at priority 8 to property AV40 on a connector named “Room 103”
