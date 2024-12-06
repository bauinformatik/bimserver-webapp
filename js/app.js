if (urlParam('dev')!=null) {
  window.sessionStorage.setItem('bimserverHost', 'http://localhost:8082');
} else {
  var urlHost = urlParam('bimserver');
  if (urlHost!=null){
    if(urlHost!=''){
      if(validateUrl(urlHost)){
         window.sessionStorage.setItem('bimserverHost', urlHost.endsWith('/') ? urlHost.slice(0,-1) : urlHost);
      }
    } else {
     window.sessionStorage.removeItem('bimserverHost')
    }
  }
}
var storedHost = window.sessionStorage.getItem('bimserverHost');
var guessedHost = document.location.href.includes('web') ? document.location.href.split('web')[0]+'bimserver' : '';
var bimserverHost =  storedHost ?  storedHost : guessedHost ? guessedHost : '';
require.config({
    urlArgs : null,
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-3.2.1.min',
        bimserverapi: bimserverHost+'/apps/bimserverjavascriptapi/bimserverapi.umd.js?v=0.0.102'
    }
});
var notifier = {
    setInfo: function(message, timeout){
        $('#feedback').text('[Info] ' + message).removeAttr('class');
     },
    setSuccess: function(message, timeout){
        $('#feedback').text('[Success] ' + message).attr('class', 'success');
    },
    setError: function(message){
        $('#feedback').text('[Error] ' + message).attr('class', 'error');
    },
    resetStatus: function(){},
    resetStatusQuick: function(){},
    clear: function(){}
}

function success(msg){
    return function(){ notifier.setSuccess(msg); };
}
function urlParam(name) {
    var results = new RegExp('[\?&]' + name + '(=([^&#]*))?').exec(window.location.href);
    return results ? results[2] : null;
}
function validateUrl(url){
  try{ new URL(url); } catch(e) {return false; } return true;
}

