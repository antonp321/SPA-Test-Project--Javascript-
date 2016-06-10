var app = app || {};

app.userController = (function(){
    function UserController(model, viewBag){
        this.model = model;
        this.viewBag = viewBag;
    }

    UserController.prototype.loadLogin = function(selector){
        this.viewBag.showLogin(selector);
    };

    UserController.prototype.loadRegister = function(selector){
      this.viewBag.showRegister(selector);
    };

    UserController.prototype.login = function(data){
        return this.model.login(data)
            .then(function(success){
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                noty({
                    theme: 'relax',
                    text: 'Login successful!',
                    type:'success',
                    timeout: 3000,
                    closeWith: ['click']
                });

                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/'});
                });
                    
            },  function(error) {
            noty({
                theme: 'relax',
                text: error.responseJSON.description,
                type: 'error',
                timeout: 3000,
                closeWith: ['click']
            });
        }).done();
    };

    UserController.prototype.register = function(data){
        return this.model.register(data)
            .then(function(success){
                sessionStorage['sessionId'] = success._kmd.authtoken;
                sessionStorage['username'] = success.username;
                sessionStorage['userId'] = success._id;

                noty({
                    theme: 'relax',
                    text: 'Registered successfully!',
                    type:'success',
                    timeout: 3000,
                    closeWith: ['click']
                });

                Sammy(function(){
                    this.trigger('redirectUrl', {url: '#/'});
                });

            }, function(error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type:'error',
                    timeout: 3000,
                    closeWith: ['click']
                });
            }).done();
    };

    UserController.prototype.logout = function(){
        return this.model.logout()
            .then(function() {
                sessionStorage.clear();

                noty({
                    theme: 'relax',
                    text: 'Logout successful!',
                    type: 'success',
                    timeout: 3000,
                    closeWith: ['click']
                });

                Sammy(function () {
                    this.trigger('redirectUrl', {url: '#/'});
                });
            } , function(error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type:'error',
                    timeout: 3000,
                    closeWith: ['click']
                });
            }).done();
    };

    return{
        load: function(model, viewBag){
            return new UserController(model, viewBag);
        }
    }

}());