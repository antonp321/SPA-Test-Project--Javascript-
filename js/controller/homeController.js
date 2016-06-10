var app = app || {};

app.homeController = (function(){
    function HomeController(viewBag){
        this.viewBag = viewBag;
    }

    HomeController.prototype.loadGuestScreen = function(selector){
        this.viewBag.showWelcomeGuestScreen(selector);
    };

    HomeController.prototype.loadUserScreen= function(selector, data){
        this.viewBag.showWelcomeUserScreen(selector, data);
    };

    return{
        load: function(viewBag){
            return new HomeController(viewBag);
        }
    }
}());