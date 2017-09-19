//How to get history Data from Commander API

$.support.cors = true;
var devices=[];
var pollPointCount=0;
var tempPower;


function  runObjectQuery(cb){
  var usage=0;
  console.log('Running the command');
    // sendExpr('parseSetpointActionsSetOR("testDWDoverride and temp","2017-07-21T14:56-7:00_15min_80.1°F")', function(err,data){
    // sendExpr('readAll(unit=="kW")', function(err,data){
    //sendExpr('pointWrite(@20af4829-cc1bca09,false,8,"daryl")', function(err,data){
    //pointWrite('@20af4829-cc1bca09,true,3,"daryl"', function(err,data){  ---getting a parse error  
    var query=$('#user-query').val();
    queryTerm(query, function(err,data){  
      if(!data){
        showLogin();
      }else{
        var rows = data.results;
        $('#subHeader').text('Meter Data');
        $('#getData').text('');
        var html="<tr><th>No.</th><th>Name</th><th>Value</th></tr>" ;
        if(rows.length){
          for(var i = 0; i <= rows.length-1; i++){
              var cName = rows[i].tags.dis;
              var cData = rows[i].tags.curVal;
              html += "<tr><td>"+(i)+"</td><td>"+cName+"</td><td>"+cData+"</td></tr>";
          }
        }
        $('#discover-data').html(html);
      }
  }, 'text/zinc; charset=utf-8', host,project);
}


function updateValues(deviceList){
    for(var i in deviceList){
      var pntid=deviceList[i].id.split(' ')[0];
      if(devices[pntid]){
        //update point value
        devices[pntid].curVal=deviceList[i].curVal;
      }else{
        //Add new point to device list
        devices[pntid]=deviceList[i];
      }
    }
  displayPoints();
}
function displayPoints(){
  var pointNameVal='';
  var pntNum=0;
  for(var i in devices){
    pntNum++;
    pointNameVal+=pntNum+'. '+devices[i].navName+':'+devices[i].curVal+'\r\n';
  }
  $('#getData').html(pointNameVal);
}



function  readAHistory(cb){
  var usage=0;
  var energyUsage = '';

  console.log('Getting the History...');
    sendExpr('read(dis==\"chA heat flow, + totalizer\").hisRead(today())', function(err,data){
      //data = parseZinc(data);
      var rows = data.split('\n');
      $('#subHeader').text('Meter Data');
      $('#getData').text('');
      var html="<tr><th>No.</th><th>timestamp</th><th>value</th></tr>" ;

      if(rows.length){
        for(var i = 2; i <= rows.length - 3; i++){
            var cData = rows[i].split(",");
            html += "<tr><td>"+(i-2)+"</td><td>"+cData[0]+"</td><td>"+cData[1]+"</td></tr>";
        }
      }
      
      

      $('#discover-data').html(html);

      if(cb){
        cb(err, energyUsage);
      }
    }, 'text/plain', host,project);
}

var updateIntervalSeconds=0.1;
var updateTimeout;
function update(){
  updateTimeout= setTimeout(function () {
    //readAHistory();

    runObjectQuery();
    // clearTimeout(leaseTimeOut); //Clear subscription timeout
    watchLeaseTimeout(); //Restart timeout
    updateIntervalSeconds=updateTimeSeconds;
    var pollPoints='';
    if(pollPointCount>0) pollPoints=pollPointCount+' at ';
    $('#last-update').text("updated: "+pollPoints+ new Date().toLocaleTimeString());
    if (autoUpdate){update();}
  }, updateIntervalSeconds*1000);
}

var leaseTimeMs=60000;
var leaseTimeout;
function watchLeaseTimeout(){
  leaseTimeOut=setTimeout(function () {
    stopUpdateTimerButton();
    clearTimeout(updateTimeout);
    $('#last-update').text('Lease Expired '+ new Date().toLocaleTimeString());
  }, leaseTimeMs);
}