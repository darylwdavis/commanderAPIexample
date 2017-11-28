var updateTimeSeconds= 5;
var host="https://10.40.2.32";
var cloudHost="https://commander2.kmccontrols.com";
var projectName= "Advanced Tech Center";
var proxyurl = "https://cors-anywhere.herokuapp.com/";
const cloudServerMode=true;
if (cloudServerMode){
    host=cloudHost;
}else{
    proxyurl=''
};
