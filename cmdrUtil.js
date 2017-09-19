function queryTerm(term, cb, accept, host, pname){
  var h = '';
  if(host)
    h = host;
  var headers = {          
    Accept: accept||"application/json; charset=utf-8",         
    "Content-Type": "text/plain; charset=utf-8"
  };
  if(host)
  //  headers.Cookie = Cookie;
   var data = 'ver:"2.0"\n'
  //   'expr\n'+
  //   '"'+expr.replace(/"/g,'\\\"')+'"';
    //console.log(h+'/api/'+(pname?pname:project)+'/evalAll');
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

function login(username,password){
 // get the userSalt and nonce from /auth/CloudProjectName/api?username
      var headers = {          
        Accept: "application/json; charset=utf-8",         
        "Content-Type": "text/plain; charset=utf-8"
      };
    if(host)
        headers.Cookie = Cookie;
    $.ajax({
      type: 'GET',
      url: host+'/auth/'+project+'/api?'+username,
      headers: headers,
      xhrFields: {
        withCredentials: true
      },
      success: function(data){
        var rows = data.split('\n');
        var userSalt = rows[1].split(':')[1];
        var nonce = rows[3].split(':')[1];
        var shaObj = new jsSHA('SHA-1', "TEXT");
        shaObj.setHMACKey(password, "TEXT");
        shaObj.update(username+':'+userSalt);
        var hmac = shaObj.getHMAC("B64");
        var shaObj2 = new jsSHA('SHA-1', 'TEXT');
        shaObj2.update(hmac+':'+nonce);
        var hash = shaObj2.getHash('B64');
        data = 'nonce:'+nonce+'\n'+'digest:'+hash;
        $.ajax({
          type: 'POST',
          url: host+'/auth/'+project+'/api?'+username,
          headers: headers,
          xhrFields: {
            withCredentials: true
          },
          data: data,
          success: function(data){
            Cookie = data.substring(data.indexOf(':')+1);
            Connected = true;
            location.reload();
            loginSuccess();
          }
        }).fail(function(){
           loginFail();
        });
      }
    });
}
function logout(){
    var headers = {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "text/plain; charset=utf-8"
    };
    $.ajax({
      type: 'GET',
      url: host+'/auth/'+project+'/logout',
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

