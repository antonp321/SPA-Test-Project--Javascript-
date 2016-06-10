var app = app || {};

(function(){
    var router = Sammy(function(){

        var selector = '#container';
        var heroId;
        var heroData;
        // var arr = window.location.href.split('/');
        // var heroId = arr[arr.length - 1];
        // var heroUrl = '#/heroes/' + heroId;

        var requester = app.requester.load('kid_Z1T54GH2Gb','394dfe31fc4d4fbcb3638144cc2a015f', 'https://baas.kinvey.com/');

        var userViewBag = app.userViewBag.load();
        var homeViewBag = app.homeViewBag.load();
        var heroesListViewBag = app.heroesListViewBag.load();
        var storeViewBag = app.storeViewBag.load();
        var inventoryViewBag = app.inventoryViewBag.load();

        var userModel = app.userModel.load(requester);
        var heroesListModel = app.heroesListModel.load(requester);
        var storeModel = app.storeModel.load(requester);

        var userController = app.userController.load(userModel, userViewBag);
        var homeController = app.homeController.load(homeViewBag);
        var heroesListController = app.heroesListController.load(heroesListModel, heroesListViewBag);
        var storeController = app.storeController.load(storeModel, storeViewBag, requester);
        var inventoryController = app.inventoryController.load(inventoryViewBag, requester);

        this.get('#/login/', function(){
            userController.loadLogin(selector);
        });

        this.get('#/register/', function(){
            userController.loadRegister(selector);
        });

        this.get('#/', function(){
            if(sessionStorage['sessionId']){
                var data = {
                    username: sessionStorage['username']
                };
                homeController.loadUserScreen(selector, data);
            }
            else{
                homeController.loadGuestScreen(selector);
            }
        });

        this.get('#/heroes/list/', function(){
            heroesListController.listMyHeroes(selector);
        });

        this.get('#/heroes/:id', function () {
            var someId = this.params['id'];
            heroId = this.params['id'];
            if(someId) {
                heroesListController.getCurrentHeroInformation(selector, someId);
                // updateStatsBool[someId] = false;
            }
        });

        this.get('#/heroes/:id/store', function () {
            var someId = this.params['id'];
            if(someId) {
                storeController.listStoreItems(selector);
            }
        });

        this.get('#/heroes/add/', function(){
            var data = {
              classes:[]
            };  

            for(var i = 0; i < 2; i++){
                if(i === 0){
                    data.classes.push({
                        name : 'Barbarian',
                        attackPoints : '25',
                        defensePoints : '55',
                        lifePoints : '200'
                    });
                }
                if(i === 1){
                    data.classes.push({
                        name : 'Amazon',
                        attackPoints : '45',
                        defensePoints : '40',
                        lifePoints : '140'
                    });
                }
            }
            heroesListController.showAddHero(selector, data);
        });

        this.get('#/heroes/:id/inventory', function () {
            var someId = this.params['id'];
            if(someId) {
                inventoryController.showHeroItems(selector, someId);
            }
        });

        this.get('#/logout/', function(){

        });

        this.bind('redirectUrl', function(ev,data){
            this.redirect(data.url);
        });

        this.bind('login', function(ev, data){
            userController.login(data);
        });

        this.bind('register', function(ev, data){
            userController.register(data);
        });

        this.bind('logout', function(ev){
            userController.logout();
        });

        this.bind('showMyHeroes', function(ev){
           heroesListController.listMyHeroes(selector);
        });

        this.bind('addNewHero', function(ev, data){
            heroesListController.addHero(data);
        });

        this.bind('getHeroData', function(ev, data){
            heroData = data;
        });

        this.bind('getItemId', function(ev, itemReferences){
            storeController.postItemToTheCurrentHero(itemReferences.itemRef, heroId, heroData, itemReferences.itemType);
        });
        
        // this.bind('getId', function(ev, data){
        //    this.get('#/heroes/' + data, function(){
        //         heroesListController.getCurrentHeroInformation(selector, data);
        //    });
        // });
    });
    router.run('#/');
}());