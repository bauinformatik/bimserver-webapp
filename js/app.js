if (urlParam('dev')) window.sessionStorage.setItem('bimserverHost', 'http://localhost:8080/bimserver/');
if (urlParam('bimserver')) window.sessionStorage.setItem('bimserverHost', urlParam('bimserver'));
var storedHost = window.sessionStorage.getItem('bimserverHost');
var bimserverHost =  storedHost ?  storedHost : document.location.href.split('web')[0];
require.config({
    urlArgs : null,
    baseUrl: 'js',
    paths: {
        jquery: 'jquery-3.2.1.min',
        bimserverapi: bimserverHost+'apps/bimserverjavascriptapi/bimserverapi.umd.js?v=0.0.102'
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
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results ? results[1] : false;
}

