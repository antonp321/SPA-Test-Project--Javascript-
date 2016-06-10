var app = app || {};

app.userViewBag = (function(){

    function showLogin(selector){
        $.get('templates/login.html', function(templ){
            $.get('templates/menu-login.html', function(temp){
                var renderedData = Mustache.render(templ);
                $(selector).html(temp + renderedData);

                $('#login-button').on('click', function(){
                    var username = $('#username').val();
                    var password = $('#password').val();

                    Sammy(function(){
                        this.trigger('login',{username: username, password: password});
                    })
                })
            });
        });
    }

    function showRegister(selector){
        $.get('templates/register.html', function(templ){
            $.get('templates/menu-login.html', function(temp){
                var renderedData = Mustache.render(templ);
                $(selector).html(temp + renderedData);

                $('#register-button').on('click', function(){
                    var username = $('#username').val();
                    var password = $('#password').val();

                    Sammy(function(){
                        this.trigger('register',{username: username, password: password});
                    })
                })
            });
        });
    }

    return {
        load: function() {
            return {
                showLogin: showLogin,
                showRegister: showRegister
            }
        }
    }
}());