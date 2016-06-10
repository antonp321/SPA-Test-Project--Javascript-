var app = app || {};

app.homeViewBag = (function(){

    function showWelcomeGuestScreen(selector){
        $.get('templates/welcome-guest.html', function(templ){
            $.get('templates/menu-login.html', function(temp){
                var renderedData = Mustache.render(templ);
                $(selector).html(temp + renderedData);
            });
        });
    }

    function showWelcomeUserScreen(selector, data){
        $.get('templates/welcome-user.html', function(templ){
            $.get('templates/menu-home.html', function(temp){
                var renderedData = Mustache.render(templ, data);
                $(selector).html(temp + renderedData);

                $('#logoutButton').on('click', function(){

                    Sammy(function(){
                        this.trigger('logout');
                    })
                });

                $('#heroes-list').on('click', function(){

                    Sammy(function(){
                        this.trigger('showMyHeroes');
                    })
                });
            });
        });
    }

    return {
        load: function() {
            return {
                showWelcomeGuestScreen: showWelcomeGuestScreen,
                showWelcomeUserScreen: showWelcomeUserScreen
            }
        }
    }
}());