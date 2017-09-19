function queryTerm(term, cb, accept, host, pname){
  var h = '';
  if(host)
    h = host;
  var headers = {          
    Accept: accept||"application/json; charset=utf-8",         
    "Content-Type": "text/plain; charset=utf-8"
  };
  if(host)
   headers.Cookie = Cookie;
   var data = 'ver:"2.0"\n'
  $.ajax({
    type: 'GET',
    url: h+'/api/objects?q='+encodeURIComponent(term)+'&a=true',
    headers: headers,
    xhrFields: {
      withCredentials: true
    },
    error: function(err){
      cb(err);
    },
    success: function(data){
      cb(null, data);
    }
  });
}


function pointWrite(expr, cb, accept, host, pname){
  var h = '';
  if(host)
    h = host;
  var headers = {          
    Accept: accept||"application/json; charset=utf-8",         
    "Content-Type": "text/plain; charset=utf-8"
  };
  if(host)
    headers.Cookie = Cookie;
  var data = 'ver:"2.0"\n'+
    'id,val,level,who\n'+
    expr.replace(/"/g,'\\\"');
  $.ajax({
    type: 'POST',
    url: h+'/api/'+(pname?pname:project)+'/pointWrite',
    headers: headers,
    data: data,
    xhrFields: {
      withCredentials: true
    },
    error: function(err){
      cb(err);
    },
    success: function(data){
      cb(null, data);
    }
  });
}


var Cookie;
var Connected = false;
var autoUpdate=false;
var projectId='';

function login(username,password){
    $('#cloud-modal-login').attr('disabled', 'true');
    $.ajax({
      type: 'POST',
      url: 'https://projects.kmccontrols.com/loginAJAX',
      data: {
        email: username,
        password: password
      },
      xhrFields: {
        withCredentials: true
      },
      success: function(data){
          $.ajax({
            type: 'GET',
            url: 'https://projects.kmccontrols.com/users/me/activelicenses',
            xhrFields: {
              withCredentials: true
            },
            success: function(data){
              var projectKey='';
              for(var i in data.data)
                if (data.data[i].name==projectName){projectKey=data.data[i].cryptokey}
              $.ajax({
                type: 'POST',
                url: host+'/setlicense/'+projectKey,
                success: function(data){
                  console.log(data);
                  loginSuccess()
                }
              }).fail(function(data){
                console.log(data);
                loginFail();
              });
            }
        }).fail(function(){
           loginFail();
        });
      }
    });
  $('#cloud-modal-login').attr('disabled', 'false');
}
function logout(){
    var headers = {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8"
    };
    $.ajax({
      type: 'GET',
      url: host+'/logout',
      headers: headers,
      xhrFields: {
        withCredentials: true
      },
      success: function(data){
          Connected = false;
          location.reload();
          }
      });
 }

