var app = app || {};

app.storeController = (function() {
    function StoreController(model, viewBag, requester) {
        this.model = model;
        this.viewBag = viewBag;
        this.heroListModel = app.heroesListModel.load(requester);
    }

    StoreController.prototype.listStoreItems = function(selector){
        var _this = this;
        this.model.getItems()
            .then(function(data){
                var result = {
                    items:[]
                };

                // console.log(data);
                // console.log("check this shit !");

                data.forEach(function(item){
                    result.items.push({
                        name: item.name,
                        attackPoints: item['attack-points'],
                        defensePoints: item['defense-points'],
                        lifePoints: item['life-points'],
                        _id: item._id,
                        type: {
                            name: item.type.name
                        }
                    });
                });
                // console.log("check this shit2 !");

                _this.viewBag.showStore(selector, result);

            }).done();
    };

    StoreController.prototype.postItemToTheCurrentHero = function(itemReference, heroId, data, itemType){
        var _this = this;
        // console.log(data.items);
        var checkerFlag = 0;
        var itemsIdForRemoving;
        var minusAttack;
        var minusDefence;
        var minusLife;

        for(var i = 0; i < data.items.length; i++){
            if(data.items[i].type.name === itemType){
                checkerFlag = 1;
                itemsIdForRemoving = data.items[i]._id;
                minusAttack = data.items[i]["attack-points"];
                minusDefence = data.items[i]["defense-points"];
                minusLife = data.items[i]["life-points"];
            }
        }


        console.log(itemsIdForRemoving);

        if(checkerFlag === 0) {

            data.items.push(itemReference);
            this.model.addItemToHero(data, heroId)
                .then(function () {
                    console.log("The item is added !!!");

                    Sammy(function () {
                        this.trigger('redirectUrl', {url: '#/heroes/list/'});
                    });

                    _this.heroListModel.getCurrentHeroInfo(heroId)
                        .then(function (data) {

                            var newAttack = data.class.Apts;
                            var newDefense = data.class.Dpts;
                            var newLife = data.class.Lpts;

                            newAttack += data.items[data.items.length - 1]["attack-points"];
                            newDefense += data.items[data.items.length - 1]["defense-points"];
                            newLife += data.items[data.items.length - 1]["life-points"];


                            data.class.Apts = newAttack;
                            data.class.Dpts = newDefense;
                            data.class.Lpts = newLife;

                            _this.heroListModel.editHeroPoints(heroId, data)
                                .then(function (success) {
                                    console.log("HeroUpdatedSuccesfully");

                                }).done();
                        }).done();
                }).done();
        }
        else{

            noty({
                text: 'You already have: ' + itemType + '. Do you want to throw it and buy this item instead?',
                type: 'confirm',
                buttons: [
                    {
                        addClass: 'btn btn-primary', text: 'Yes', onClick: function ($noty) {
                        $noty.close();

                        console.log('does it work !!');

                        _this.heroListModel.removeItem(heroId, itemsIdForRemoving)
                                .then(function (_) {
                                    console.log("item is removed");

                                    data.class.Apts -= minusAttack;
                                    data.class.Dpts -= minusDefence;
                                    data.class.Lpts -= minusLife;

                        data.items.push(itemReference);

                        for(var i = 0; i < data.items.length; i++){
                            if(data.items[i]._id === itemsIdForRemoving){
                                data.items.splice(i, 1);
                            }
                        }

                        console.log('additemtoherodatacheck it before ! ->');
                        console.log(data);

                        _this.model.addItemToHero(data, heroId)
                            .then(function () {
                                console.log("The item is added !!!");

                                console.log('additemtoherodatacheck it after! ->');
                                console.log(data);

                                _this.heroListModel.getCurrentHeroInfo(heroId)
                                    .then(function (data) {


                                        console.log(data);
                                var newAttack1 = data.class.Apts;
                                var newDefense1 = data.class.Dpts;
                                var newLife1 = data.class.Lpts;

                                newAttack1 += data.items[data.items.length - 1]["attack-points"];
                                newDefense1 += data.items[data.items.length - 1]["defense-points"];
                                newLife1 += data.items[data.items.length - 1]["life-points"];


                                data.class.Apts = newAttack1;
                                data.class.Dpts = newDefense1;
                                data.class.Lpts = newLife1;

                                _this.heroListModel.editHeroPoints(heroId, data)
                                    .then(function (success) {
                                        console.log("HeroUpdatedSuccesfully");

                                    }).done();

                                }).done();

                            }).done();

                    }).done();

                        Sammy(function () {
                            this.trigger('redirectUrl', {url: '#/heroes/list/'});
                        });

                    }
                    },
                    {
                        addClass: 'btn btn-danger', text: 'Cancel', onClick: function ($noty) {
                        $noty.close();
                    }
                    }
                ]
            })
        }
    };

    return {
        load: function (model, viewBag, requester) {
            return new StoreController(model, viewBag, requester);
        }
    }
}());
