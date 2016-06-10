var app = app || {};

app.heroesListController = (function() {
    function HeroesListController(model, viewBag) {
        this.model = model;
        this.viewBag = viewBag;
    }

    HeroesListController.prototype.listMyHeroes = function(selector){
        var _this = this;
        var userId = sessionStorage['userId'];
        this.model.getUsersHeroes(userId)
            .then(function(data) {
                var result = {
                    heroes: []
                };

                data.forEach(function (hero) {
                    if (hero.class._id === "574b0db4735b78fb1bdc0ebc") {
                        result.heroes.push({
                            id: hero._id,
                            name: hero.name,
                            imageUrl: "imgs/barbarian.png"
                        });
                    }
                    else {
                        result.heroes.push({
                            id: hero._id,
                            name: hero.name,
                            imageUrl: "imgs/amazon.png"
                        });
                    }
                });

                _this.viewBag.loadHeroesList(selector, result);

            } , function (error) {
                noty({
                    theme: 'relax',
                    text: error.responseJSON.description,
                    type: 'error',
                    timeout: 2000,
                    closeWith: ['click']
                });
            })
    };

    HeroesListController.prototype.getCurrentHeroInformation = function(selector, heroId){
        var _this = this;
        this.model.getCurrentHeroInfo(heroId)
            .then(function(data){
                
                console.log(data);

                var result = {};
                if(data.class._id === "574b0dc2f68aa6567a80ee5d"){
                    result = {
                        name: data.name,
                        attackPoints: data.class.Apts,
                        defensePoints: data.class.Dpts,
                        lifePoints: data.class.Lpts,
                        id: data._id,
                        imageUrl: "imgs/amazon.png"
                    };
                }
                else{
                    result = {
                        name: data.name,
                        attackPoints: data.class.Apts,
                        defensePoints: data.class.Dpts,
                        lifePoints: data.class.Lpts,
                        id: data._id,
                        imageUrl: "imgs/barbarian.png"
                    };
                }

                var heroData = data;

                Sammy(function(){
                    this.trigger('getHeroData', heroData);
                });

                _this.viewBag.loadCurrentHeroTempl(selector, result);

            }).done();
    };

    HeroesListController.prototype.showAddHero = function(selector, data){
        this.viewBag.addHeroTempl(selector, data);
    };

    HeroesListController.prototype.addHero = function(data){
        var _this = this;
        var takeTheId;

        if(data.name) {

            this.model.addNewHero(data)
                .then(function (data) {
                    noty({
                        theme: 'relax',
                        text: 'Hero added successfully!',
                        type: 'success',
                        timeout: 3000,
                        closeWith: ['click']
                    });
                    // console.log(data);

                    takeTheId = data._id;

                    Sammy(function () {
                        this.trigger('getFuckingId', takeTheId);
                    });

                    var theUrl = '#/heroes/' + takeTheId;

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/heroes/list/'});
                    });

                    _this.model.getCurrentHeroInfo(takeTheId)
                        .then(function (data) {

                            var newAttack = data.class.Apts;
                            var newDefense = data.class.Dpts;
                            var newLife = data.class.Lpts;

                            data.items.forEach(function (item) {
                                newAttack += item["attack-points"];
                                newDefense += item["defense-points"];
                                newLife += item["life-points"];
                            });

                            data.class.Apts = newAttack;
                            data.class.Dpts = newDefense;
                            data.class.Lpts = newLife;

                            _this.model.editHeroPoints(takeTheId, data)
                                .then(function (success) {
                                    noty({
                                        theme: 'relax',
                                        text: 'Hero stats updated successful!',
                                        type: 'success',
                                        timeout: 3000,
                                        closeWith: ['click']
                                    });
                                }, function (error) {
                                    noty({
                                        theme: 'relax',
                                        text: error.responseJSON.description,
                                        type: 'error',
                                        timeout: 3000,
                                        closeWith: ['click']
                                    });
                                }).done();

                        }).done();

                }, function (error) {
                    noty({
                        theme: 'relax',
                        text: error.responseJSON.description,
                        type: 'error',
                        timeout: 3000,
                        closeWith: ['click']
                    });
                }).done();
        }
        else{
            noty({
                theme: 'relax',
                text: "The name input field is empty. Fill it !",
                type: 'error',
                timeout: 3000,
                closeWith: ['click']
            });
        }
    };

    return {
        load: function (model, viewBag) {
            return new HeroesListController(model, viewBag);
        }
    }
}());
