var app = app || {};

app.userModel = (function(){
    function UserModel(requester){
        this.requester = requester;
        this.userUrl = requester.baseUrl + 'user/' + requester.appId;
    }


    //3 Methods : login, register, logout
    UserModel.prototype.login = function(data){
        var loginUrl = this.userUrl + '/login';
        return this.requester.post(loginUrl, false, data);
    };

    UserModel.prototype.register = function(data){
        var registerUrl = this.userUrl;
        return this.requester.post(registerUrl, false, data);
    };

    UserModel.prototype.logout = function(){
        var logoutUrl = this.userUrl + '/_logout';
        return this.requester.post(logoutUrl, true, null);
    };

    return {
        load: function(requester){
            return new UserModel(requester);
        }
    }

}());