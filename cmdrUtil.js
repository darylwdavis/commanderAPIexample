function queryTerm(term, cb, accept, host, pname){
  var headers = {          
    Accept: accept||"application/json; charset=utf-8",         
    "Content-Type": "text/plain; charset=utf-8"
  };
  $.ajax({
    type: 'GET',
    xhrFields: {
      withCredentials: true
    },
    url: host+'/data/objects?q='+encodeURIComponent(term),
    headers: headers,
    error: function(err){
      cb(err);
    },
    success: function(data){
      cb(null, data);
    }
  });
}

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
              for(var i in data.data){
                if (data.data[i].name==projectName){
                  projectKey=data.data[i].cryptokey;
                }
              }
              $.ajax({
                type: 'GET',
                url: host+'/setlicense/'+projectKey,
                xhrFields: {
                  withCredentials: true
                },
                success: function(res,status,xhr){
                  var Cookie = xhr.getResponseHeader('Set-Cookie');
                  loginSuccess()
                },
              }).fail(function(data){
                console.log(data);
                loginFail();
              });
            }
        }).fail(function(){
           loginFail();
        });
      }
    }).fail(function(data){
        console.log(data);
        loginFail();
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

