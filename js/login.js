require(['app'], function(common){
require(['bimserverapi', 'jquery'], function(bimserverapi, jquery){
    var api = new bimserverapi.BimServerClient(bimserverHost, notifier);
	api.init(function(api1, serverInfo){
        $('#login').submit(function(event){
            var user = $('#user').val();
            var password = $('#password').val();
            api.login(user, password, function(){
                $('#username').text(user);
                $('#login').hide();
                $('#logout').show();
                $('#changePassword').show();
	            window.sessionStorage.setItem('token', api.token)
            }, function(error){
                console.log(error);
            });
            event.preventDefault();
        });
        $('#logout').submit(function(event){
            api.logout(function(){
                $('#username').text('none');
                $('#logout').hide();
                $('#login').show();
                $('#changePassword').hide();
            });
            event.preventDefault();
        });
        $('#changePassword').submit(function(event){
            api.resolveUser(function(user){
                api.call('AuthInterface', 'changePassword', {
                    "uoid": user.oid,
                    "oldPassword": $('#oldPassword').val() ,
                    "newPassword": $('#newPassword').val()
                }, function(data){
                    api.notifier.setInfo('Changed Password');
                }, function(data){
                    api.notifier.setError('Something went wrong')
                });
            });
            event.preventDefault();
        });
    });
}); });